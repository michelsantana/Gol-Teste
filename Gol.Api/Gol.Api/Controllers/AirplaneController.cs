using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Gol.Domain;
using Gol.Entity;
using Gol.Entity.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Gol.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AirplaneController : ControllerBase
    {
        private readonly ILogger<AirplaneController> _logger;

        private iAirplaneRepository _airplaneRepository;

        public AirplaneController(ILogger<AirplaneController> logger, iAirplaneRepository airplaneRepository)
        {
            this._logger = logger;
            this._airplaneRepository = airplaneRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var results = await _airplaneRepository.GetAllAirplane();
                return Ok(results);
            }
            catch (Exception ex)
            {
                return await Error(ex);
            }
        }

        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(long id)
        {
            try
            {
                var resultFilter = await _airplaneRepository.FindAirplane(id);
                return Ok(resultFilter);
            }
            catch (Exception ex)
            {
                return await Error(ex);
            }
        }

        [HttpGet("Find/{search}")]
        public async Task<IActionResult> Find(string search)
        {
            try
            {
                var resultFilter = _airplaneRepository.FindAirplaneAny(search);
                return Ok(resultFilter);
            }
            catch (Exception ex)
            {
                return await Error(ex);
            }
        }


        [HttpPost]
        public async Task<IActionResult> Post(Airplane model)
        {
            try
            {
                await _airplaneRepository.Add(model);

                if (await _airplaneRepository.SaveChanges())
                    return Created($"Airplane/{model.id}", model);
            }
            catch (Exception ex)
            {
                return await Error(ex);
            }
            return BadRequest();
        }

        [HttpPut]
        public async Task<IActionResult> Put(Airplane model)
        {
            try
            {
                var airplane = await _airplaneRepository.FindAirplane(model.id);

                if (airplane == null) return NotFound();

                _airplaneRepository.Update(model);

                if (await _airplaneRepository.SaveChanges())
                    return Created($"Airplane/{model.id}", model);

            }
            catch (Exception ex)
            {
                return await Error(ex);
            }
            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            try
            {
                var airplane = await _airplaneRepository.FindAirplane(id);
                
                if (airplane == null) return NotFound();

                _airplaneRepository.Remove(airplane);

                if (await _airplaneRepository.SaveChanges())
                    return Ok();

            }
            catch (Exception ex)
            {
                return await Error(ex);
            }
            return BadRequest();
        }

        async Task<IActionResult> Error(Exception ex)
        {
            string msg = "Erro ao buscar aviões";
            _logger.LogError(ex, msg);
            return StatusCode(StatusCodes.Status500InternalServerError, msg);
        }
    }
}

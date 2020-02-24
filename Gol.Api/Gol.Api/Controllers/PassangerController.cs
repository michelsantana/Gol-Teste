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
    public class PassangerController : ControllerBase
    {
        private readonly ILogger<PassangerController> _logger;
        private readonly iPassangerRepository _passanger;

        public PassangerController(ILogger<PassangerController> logger, iPassangerRepository passanger)
        {
            this._logger = logger;
            this._passanger = passanger;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var results = await _passanger.GetAllPassanger();
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
                var resultFilter = await _passanger.FindPassanger(id);
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
                var resultFilter = _passanger.FindPassangerAny(search);
                return Ok(resultFilter);
            }
            catch (Exception ex)
            {
                return await Error(ex);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(Passanger model)
        {
            try
            {
                await _passanger.Add(model);

                if (await _passanger.SaveChanges())
                    return Created($"Airplane/{model.id}", model);
            }
            catch (Exception ex)
            {
                return await Error(ex);
            }
            return BadRequest();
        }

        [HttpPut]
        public async Task<IActionResult> Put(Passanger model)
        {
            try
            {
                var airplane = await _passanger.FindPassanger(model.id);

                if (airplane == null) return NotFound();

                _passanger.Update(model);

                if (await _passanger.SaveChanges())
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
                var airplane = await _passanger.FindPassanger(id);

                if (airplane == null) return NotFound();

                _passanger.Remove(airplane);

                if (await _passanger.SaveChanges())
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

# Gol-Teste
 Teste gol .netcore + angular 7

Por limitações em minha máquina, foi necessário criar um projeto aspnet core no vs2019.
E o projeto Angular foi criado via linha de comando e utilizei o vscode para editalo.
O banco de dados precisei utilizar o Sqlite.

Para iniciar o projeto:

	-Baixar o projeto em uma pasta qualquer.
	
	-Abrir a solution Gol-Teste\Gol.Api\Gol.Api.sln no vs2019 
		-Configurar no Gol-Teste\Gol.Api\Gol.Api\appsettings.json o caminho na chave DefaultConnection
		-Apontar para o banco local em: Gol-Teste\Gol.Api\Gol.Entity\Gol.db
		-Rodar
		
	-Abrir a pasta Gol-Teste\Gol.Api\Gol.Web\Gol-Web no vscode
		-Configurar a url da api em Gol-Teste\Gol.Api\Gol.Web\Gol-Web\src\environments\environment.ts
		-Executa o comando: 
			npm install --save-dev @angular-devkit/build-angular
		-Após conclusão do comando, utilizar ng serve para iniciar o projeto angular em http://localhost:4200/
		
			
			
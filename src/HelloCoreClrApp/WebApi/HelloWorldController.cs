﻿using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Serilog;

namespace HelloCoreClrApp.WebApi
{
    [Controller]
    [Route("api")]
    public class HelloWorldController
    {
        private static readonly ILogger Log = Serilog.Log.ForContext<HelloWorldController>();
        private readonly IActionFactory actionFactory;
        
        public HelloWorldController(IActionFactory actionFactory)
        {
            this.actionFactory = actionFactory;
        }
        
        [Route("sayhelloworld/{name}")]
        [HttpGet]
        public async Task<IActionResult> SayHelloWorldAsync(string name)
        {
            Log.Information("'sayhelloworld' Request received with '{0}'.", name);
            
            var action = actionFactory.CreateSayHelloWorldAction();
            var response = await action.ExecuteAsync(name);

            return new OkObjectResult(response);
        }

        [Route("greetings")]
        [HttpGet]
        public async Task<IActionResult> GetLastTenGreetingsAsync()
        {
            Log.Information("'greetings' Request received.");
            
            var action = actionFactory.CreateGetLastTenGreetingsAction();
            var response = await action.ExecuteAsync();

            if(response.GetLength(0) == 0)
                return new NoContentResult();

            return new OkObjectResult(response);
        }

        [Route("greetings/count")]
        [HttpGet]
        public async Task<IActionResult> GetTotalNumberOfGreetingsAsync()
        {
            Log.Information("'greetings/count' Request received.");
            
            var action = actionFactory.CreateGetTotalNumberOfGreetingsAction();
            var response = await action.ExecuteAsync();

            return new OkObjectResult(response);
        }
    }
}

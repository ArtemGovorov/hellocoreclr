﻿using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.AspNet.Mvc.Controllers;
using SimpleInjector;
using SimpleInjector.Integration.AspNet;

namespace HelloWorldApp
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
        }
        
        private readonly Container container = new Container();
        
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddMvc();
            
            // Add SimpleInjector Controller Activator
            services.AddInstance<IControllerActivator>(new SimpleInjectorControllerActivator(container));
        }
        
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        // Configure is called after ConfigureServices is called.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            // Setup SimpleInjector
            container.Options.DefaultScopedLifestyle = new AspNetRequestLifestyle();
            app.UseSimpleInjectorAspNetRequestScoping(container);
            
            container.CrossWire<ILoggerFactory>(app);
            container.Register<IResourceProvider, ResourceProvider>(Lifestyle.Scoped);
            container.Register<IActionFactory, ActionFactory>(Lifestyle.Scoped);
            container.Register<IGetHelloWorldAction, GetHelloWorldAction>(Lifestyle.Scoped);
            container.RegisterAspNetControllers(app);
            
            container.Verify();
            
            // Configure logging
            loggerFactory.AddConsole();
            loggerFactory.AddDebug();
            
            // Serve the default file, if present.
            app.UseDefaultFiles();
            // Add static files to the request pipeline.
            app.UseStaticFiles();
            
            // Add MVC to the request pipeline.
            app.UseMvc();
        }
        
        // Entry point for the application.
        public static void Main(string[] args) => WebApplication.Run<Startup>(args);
    }
}

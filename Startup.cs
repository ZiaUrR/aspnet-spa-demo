using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNet.Diagnostics;

namespace Frontend
{
    /// <summary>
    /// Startup class for the frontend
    /// </summary>
    public class Startup
    {
        /// <summary>
        /// Configures services for the application
        /// </summary>
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
        }

        /// <summary>
        /// Configures the application
        /// </summary>
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            // Enable browserlink and error pages for the app
            // when running in developer mode.
            if (env.IsDevelopment())
            {
                app.UseBrowserLink();
            }

            // By default we map everything to the index action
            // except for files that do exist on disk.
            app.UseDeveloperExceptionPage();
            app.UseStaticFiles();
            app.UseMvc(routes =>
            {
                routes.MapRoute("ApiRoute", "api/{controller}/{id?}");
                routes.MapRoute("DefaultRoute", "{*path}", new { controller = "Home", action = "Index" });
            });
        }

        /// <summary>
        /// Main entry point for the application
        /// </summary>
        public static void Main(string[] args) => WebApplication.Run<Startup>(args);
    }
}

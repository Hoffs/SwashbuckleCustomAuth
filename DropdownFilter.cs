using System.Linq;
using Microsoft.Extensions.Configuration;
using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace SwashAuthTest
{
    public class DropdownFilter : IOperationFilter
    {
        private readonly IConfiguration config;

        public DropdownFilter(IConfiguration config)
        {
            this.config = config;
        }

        public void Apply(OpenApiOperation operation, OperationFilterContext context)
        {
            var attrs = context.MethodInfo
                .GetCustomAttributes(true)
                .OfType<DropdownConfigList>();

            foreach (var attr in attrs)
            {
                foreach (var p in operation.Parameters)
                {
                    if (p.Name == attr.Property)
                    {
                        var section = config.GetSection(attr.ConfigPath);
                        var list = section.Get<string[]>();
                        p.Schema.Enum = list.Select(x => (IOpenApiAny) new OpenApiString(x)).ToList();
                    }
                }
            }
        }
    }
}
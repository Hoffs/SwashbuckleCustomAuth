using System;

namespace SwashAuthTest
{
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = true)]
    public class DropdownConfigList : Attribute
    {
        public DropdownConfigList(string property, string configPath)
        {
            Property = property;
            ConfigPath = configPath;
        }

        public string Property { get; }

        public string ConfigPath { get; }
    }
}
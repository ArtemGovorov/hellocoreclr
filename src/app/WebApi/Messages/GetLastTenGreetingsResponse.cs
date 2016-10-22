using System;

namespace HelloWorldApp.WebApi.Messages
{
    public class SavedGreeting{
        public string Greeting { get; set; }
        public DateTime TimestampUtc { get; set; }
    }

    public class GetLastTenGreetingsResponse
    {
        public SavedGreeting[] SavedGreetings { get; set; }
    }
}

using Microsoft.Owin.Security.OAuth;
using Microsoft.Owin.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace UYGS203.Auth
{
    public class AuthProvider : OAuthAuthorizationServerProvider
    {
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {

            //context.OwinContext.Response.Headers.Add("*", new[] { "*" }); // Farklı domainlerden istek sorunu yaşamamak için

            //Burada kendi authentication yöntemimizi belirleyebiliriz.Veritabanı bağlantısı vs...
            var UserService = new UserService();
            var user = UserService.login(context.UserName,context.Password);
            List<string> userperms = new List<string>();

            if (user != null)
            {

                string perm = "";
                if (user.UserIsAdmin == "1") { 
                    perm = "Admin";
                } else
                {
                    perm = "User";
                }

                userperms.Add(perm);

                var identity = new ClaimsIdentity(context.Options.AuthenticationType);

                identity.AddClaim(new Claim(ClaimTypes.Name, context.UserName));
                identity.AddClaim(new Claim(ClaimTypes.Role,perm));
                identity.AddClaim(new Claim(ClaimTypes.PrimarySid, user.UserId));

                AuthenticationProperties properties = new AuthenticationProperties(new Dictionary<string, string> { 
                    {"UserId", user.UserId},
                    { "UserMail",user.UserMail },
                    {"UserPerms",Newtonsoft.Json.JsonConvert.SerializeObject(userperms) },    
                });
                AuthenticationTicket ticket = new AuthenticationTicket(identity,properties);
                context.Validated(ticket);

            }
            else
            {
                context.SetError("Geçersiz istek", "Hatalı kullanıcı bilgisi");

            }
        }
        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (KeyValuePair<string, string> property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }

            return Task.FromResult<object>(null);
        }
    }
}
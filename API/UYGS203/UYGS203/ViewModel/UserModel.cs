using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UYGS203.ViewModel
{
    public class UserModel
    {

        public string UserId { get; set; }
        public string UserFullName { get; set; }
        public string UserIsAdmin { get; set; }
        public string UserRegDate { get; set; }
        public string UserMail { get; set; }
        public string UserPassword { get; set; }
        public int UserEstateAmount { get; set; }
        public string UserProfileIMG { get; set; }

    }
}
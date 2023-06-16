using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Results;
using UYGS203.Models;
using UYGS203.ViewModel;

namespace UYGS203.Auth
{
    public class UserService
    {
        DatabaseEntities db = new DatabaseEntities();
        ResultModel result = new ResultModel();

        public UserModel login(string usermail, string password)
        {
            UserModel model= db.User.Where(s=> s.UserMail == usermail && s.UserPassword == password).Select(x=>
             new UserModel() 
             { UserMail = x.UserMail,
             UserPassword = x.UserPassword,
             UserProfileIMG = x.UserProfileIMG,
             UserFullName = x.UserFullName,
             UserId = x.UserId,
             UserIsAdmin = x.UserIsAdmin,
             UserRegDate = x.UserRegDate,
            }).SingleOrDefault();
            return model;
        } 
    }
}
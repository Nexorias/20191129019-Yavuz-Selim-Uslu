using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using UYGS203.ViewModel;
using UYGS203.Models;
using System.IO;
using System.Drawing;
using System.Reflection;
using System.Web.ApplicationServices;

namespace UYGS203.Controllers
{
    

    public class baseController : ApiController
    {
        DatabaseEntities db = new DatabaseEntities();
        ResultModel result = new ResultModel();
        #region Estate

        [HttpGet]
        [Route("api/listEstate")]
        
        public List<EstateModel> ListEstates()
        {
            List<EstateModel> l = db.Estate.Select(x => new EstateModel()
            {

                EstateAdress = x.EstateAdress,
                EstateEditDate = x.EstateEditDate,
                EstateDescription = x.EstateDescription,
                EstateLocationId = x.EstateLocationId,
                EstateId = x.EstateId,
                Clicks = x.Clicks,
                EstateName = x.EstateName,
                EstatePrice = x.EstatePrice,
                EstateRegDate = x.EstateRegDate,
                DiscountPrice = x.DiscountPrice,
                IsActive = x.IsActive,
                IsDiscount = x.IsDiscount,
                EstateIMG1 = x.EstateIMG1,
                EstateIMG2 = x.EstateIMG2,
                EstateIMG3 = x.EstateIMG3,
                EstateIMG4 = x.EstateIMG4,
                EstateUserAmount = x.Banner.Count(),
                


            }).ToList();

            return l;
        }


        [HttpGet]
        [Route("api/Estatebyid/{Id}")]
        public EstateModel EstateById(string Id)
        {
            EstateModel sub = db.Estate.Where(s => s.EstateId == Id).Select(x => new
             EstateModel()
            {
                EstateAdress = x.EstateAdress,
                EstateEditDate = x.EstateEditDate,
                EstateDescription = x.EstateDescription,
                EstateLocationId = x.EstateLocationId,
                EstateId = x.EstateId,
                Clicks = x.Clicks,
                EstateName = x.EstateName,
                EstatePrice = x.EstatePrice,
                EstateRegDate = x.EstateRegDate,
                DiscountPrice = x.DiscountPrice,
                IsActive = x.IsActive,
                IsDiscount = x.IsDiscount,
                EstateIMG1 = x.EstateIMG1,
                EstateIMG2 = x.EstateIMG2,
                EstateIMG3 = x.EstateIMG3,
                EstateIMG4 = x.EstateIMG4,
                EstateUserAmount = x.Banner.Count()
                


            }).FirstOrDefault();
            return sub;
        }
        [Authorize(Roles = "Admin")]
        [HttpPost]
        [Route("api/addEstate")]
        public ResultModel AddEstate(EstateModel NewModel)
        {
            if (db.Estate.Count(s => s.EstateAdress == NewModel.EstateAdress && s.EstateName == NewModel.EstateName) > 0)
            {
                result.Result = false;
                result.msg = "Bu Konut Kayıtlıdır";
            }
            Estate sub = new Estate();
            sub.EstateId = Guid.NewGuid().ToString();
            sub.EstateName = NewModel.EstateName;
            sub.EstateAdress = NewModel.EstateAdress;
            sub.EstateEditDate = DateTime.Now.ToString("MM/dd/yyyy h:mm tt");
            sub.EstateRegDate = DateTime.Now.ToString("MM/dd/yyyy h:mm tt");
            sub.EstateDescription = NewModel.EstateDescription;
            sub.EstateLocationId = NewModel.EstateLocationId;
            sub.Clicks = 0;
            sub.EstateIMG1 = "newestate.jpg";
            sub.EstateIMG2 = "newestate.jpg";
            sub.EstateIMG3 = "newestate.jpg";
            sub.EstateIMG4 = "newestate.jpg";
            sub.EstateName = NewModel.EstateName;
            sub.EstatePrice = NewModel.EstatePrice;
            sub.DiscountPrice = NewModel.DiscountPrice;
            sub.IsActive = NewModel.IsActive;
            sub.IsDiscount = NewModel.IsDiscount;

            db.Estate.Add(sub);
            db.SaveChanges();

            result.msg = "Konut Eklendi";
            result.Result = true;
            return result;
        }
        [Authorize(Roles = "Admin")]
        [HttpPut]
        [Route("api/updateEstate")]
        public ResultModel UpdateEstate(EstateModel update)
        {
            Estate sub = db.Estate.Where(s => s.EstateId == update.EstateId).FirstOrDefault();

            if (sub == null)
            {
                result.Result = false;
                result.msg = "Konut Bulunamadı";
                return result;
            }

            sub.EstateName = update.EstateName;
            sub.EstateAdress = update.EstateAdress;
            sub.EstateEditDate = DateTime.Now.ToString("MM/dd/yyyy h:mm tt");
            sub.EstateDescription = update.EstateDescription;
            sub.EstateLocationId = update.EstateLocationId;
            sub.EstatePrice = update.EstatePrice;
            sub.DiscountPrice = update.DiscountPrice;
            sub.IsActive = update.IsActive;
            sub.IsDiscount = update.IsDiscount;
            
            db.SaveChanges();

            result.Result = true;
            result.msg = "Konut değiştirildi";

            return result;
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete]
        [Route("api/deleteEstate/{Id}")]
        public ResultModel DeleteEstate(String Id)
        {
            Estate sub = db.Estate.Where(s => s.EstateId == Id).FirstOrDefault();

            if (sub == null)
            {
                result.Result = false;
                result.msg = "Konut Bulunamadı";
                return result;
            }

            if (db.Banner.Count(s => s.BannerEstateId == Id) > 0)
            {
                result.Result = false;
                result.msg = "Konut kayıtlı kullanıcı var, ilan silinemez.";
                return result;
            }
            db.Estate.Remove(sub);
            db.SaveChanges();
            result.Result = true;
            result.msg = "Konut silindi.";

            return result;
        }
        [Authorize(Roles = "Admin")]
        [HttpPost]
        [Route("api/updateEstatePic")]
        public ResultModel UpdateEstatePic(PhotoDataModel photomodel)
        {
            Estate estate = db.Estate.Where(s => s.EstateId == photomodel.UserId).SingleOrDefault();
            if (estate == null)
            {

                result.Result = false;
                result.msg = "Kullanıcı bulunamadı";
                return result;
            }
            if (photomodel.ImgData != "newestate.jpg")
            {
                string path = System.Web.Hosting.HostingEnvironment.MapPath("~/media/" + estate.EstateIMG1 +"1");

                switch (photomodel.ImgOrder)
                {
                    case "1":
                        string path1 = System.Web.Hosting.HostingEnvironment.MapPath("~/media/" + estate.EstateIMG1 + "2");
                        if (File.Exists(path1) && estate.EstateIMG1 != "newestate.jpg")
                        {
                            File.Delete(path1);
                        }
                        break;
                    case "2":
                        string path2 = System.Web.Hosting.HostingEnvironment.MapPath("~/media/" + estate.EstateIMG2 + "3");
                        if (File.Exists(path2) && estate.EstateIMG2 != "newestate.jpg")
                        {
                            File.Delete(path2);
                        }
                        break;
                    case "3":
                        string path3 = System.Web.Hosting.HostingEnvironment.MapPath("~/media/" + estate.EstateIMG3 + "4");
                        if (File.Exists(path3) && estate.EstateIMG2 != "newestate.jpg")
                        {
                            File.Delete(path3);
                        }
                        break;
                    case "4":
                        string path4 = System.Web.Hosting.HostingEnvironment.MapPath("~/media/" + estate.EstateIMG4);
                        if (File.Exists(path4) && estate.EstateIMG2 != "newestate.jpg")
                        {
                            File.Delete(path4);
                        }
                        break;
                }
            }
              
            if (photomodel.ImgData == null && photomodel.ImgSrc == null)
            {
                result.Result = false;
                result.msg = "Bir resim girilmemiştir, lütfen tekrar deneyiniz";
                return result;
            }

            string d = photomodel.ImgData;
            string base64 = d.Substring(d.IndexOf(',') + 1);
            base64 = base64.Trim('\0');
            byte[] imgbytes = Convert.FromBase64String(base64);
            string FileName = estate.EstateId + "_"+ photomodel.ImgOrder+ photomodel.ImgSrc.Replace("image/", ".");
            using (var ms = new MemoryStream(imgbytes, 0, imgbytes.Length))
            {
                Image img = Image.FromStream(ms, true);
                img.Save(System.Web.Hosting.HostingEnvironment.MapPath("~/media/" + FileName));
            }
            switch (photomodel.ImgOrder)
            {
                case "1":
                    estate.EstateIMG1 = FileName;
                    break;
                case "2":
                    estate.EstateIMG2 = FileName;
                    break;
                case "3":
                    estate.EstateIMG3 = FileName;
                    break;
                case "4":
                    estate.EstateIMG4 = FileName;
                    break;
            }
       
        db.SaveChanges();

            result.Result = true;
            result.msg = "Resim Güncellendi";
            return result;
        }

        #endregion

        #region User


        [HttpGet]
        [Route("api/listUsers")]

        public List<UserModel> ListUsers()
        {
            List<UserModel> l = db.User.Select(x => new UserModel()
            {
                UserId = x.UserId,
                UserFullName = x.UserFullName,
                UserIsAdmin = x.UserIsAdmin,
                UserMail = x.UserMail,
                UserPassword = x.UserPassword,
                UserRegDate = x.UserRegDate,
                UserProfileIMG = x.UserProfileIMG,
                UserEstateAmount = x.Banner.Count()

            }).ToList();

            return l;
        }

        [HttpGet]
        [Route("api/UserbyId/{Id}")]

        public UserModel UserById(string Id)
        {
            UserModel l = db.User.Where(s => s.UserId == Id).Select(x => new UserModel()
            {
                UserId = x.UserId,
                UserFullName = x.UserFullName,
                UserIsAdmin = x.UserIsAdmin,
                UserMail = x.UserMail,
                UserPassword = x.UserPassword,
                UserProfileIMG = x.UserProfileIMG,
                UserRegDate = x.UserRegDate,
                UserEstateAmount = x.Banner.Count()


            }).FirstOrDefault();

            return l;
        }
        [Authorize(Roles = "Admin")]
        [HttpPost]
        [Route("api/addUser")]
        public ResultModel AddUser(UserModel NewUser)
        {
            if (db.User.Count(s => s.UserMail == NewUser.UserMail) > 0)
            {
                result.Result = false;
                result.msg = "Kullanıcı zaten var";
                return result;
            }

            User NewAddition = new User
            {

                UserId = Guid.NewGuid().ToString(),
                UserFullName = NewUser.UserFullName,
                UserIsAdmin = NewUser.UserIsAdmin,
                UserMail = NewUser.UserMail,
                UserProfileIMG = "new.jpg",
                UserPassword = NewUser.UserPassword,
                UserRegDate = DateTime.Now.ToString("MM/dd/yyyy h:mm tt"),
                
            };
            db.User.Add(NewAddition);
            db.SaveChanges();

            result.Result = true;
            result.msg = "Kullanıcı Eklendi";
            return result;
        }
        [Authorize(Roles = "Admin")]
        [HttpPut]
        [Route("api/updateUser")]
        public ResultModel UpdateUser(UserModel update)
        {
            User sub = db.User.Where(s => s.UserId == update.UserId).FirstOrDefault();

            if (sub == null)
            {
                result.Result = false;
                result.msg = "Kullanıcı Bulunamadı";
                return result;
            }

            sub.UserFullName = update.UserFullName;
            sub.UserIsAdmin = update.UserIsAdmin;
            sub.UserPassword = update.UserPassword;

            db.SaveChanges();

            result.Result = true;
            result.msg = "Kullanıcı değiştirildi";

            return result;
        }
        [Authorize(Roles = "Admin")]
        [HttpDelete]
        [Route("api/deleteUser/{Id}")]
        public ResultModel DeleteUser(String Id)
        {
            User sub = db.User.Where(s => s.UserId == Id).FirstOrDefault();

            if (sub == null)
            {
                result.Result = false;
                result.msg = "Kullanıcı Bulunamadı";
                return result;
            }

            if (db.Banner.Count(s => s.BannerUserId == Id) > 0)
            {
                result.Result = false;
                result.msg = "Kullanıcı ilan sahibi olduğu için silinemez.";
                return result;
            }


            db.User.Remove(sub);
            db.SaveChanges();
            result.Result = true;
            result.msg = "Kullanıcı Silindi";

            return result;
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        [Route("api/updateprofilepic")]
        public ResultModel UpdateProfilePicture(PhotoDataModel photomodel)
        {
            User user = db.User.Where(s => s.UserId == photomodel.UserId).SingleOrDefault();
            if (user == null)
            {

                result.Result = false;
                result.msg = "Kayıt bulunamadı";
                return result;
            }
            if (user.UserProfileIMG != "new.jpg")
            {
                string path = System.Web.Hosting.HostingEnvironment.MapPath("~/media/" + user.UserProfileIMG);
                if (File.Exists(path) && user.UserProfileIMG != "new.jpg")
                {
                    File.Delete(path);
                }
            }
            if (photomodel.ImgData == null && photomodel.ImgSrc == null)
            {
                result.Result = false;
                result.msg = "Bir resim girilmemiştir, lütfen tekrar deneyiniz";
                return result;
            }
            string d = photomodel.ImgData;
            string base64 = d.Substring(d.IndexOf(',') + 1);
            base64 = base64.Trim('\0');
            byte[] imgbytes = Convert.FromBase64String(base64);
            string FileName = user.UserId + photomodel.ImgSrc.Replace("image/", ".");
            using (var ms = new MemoryStream(imgbytes, 0, imgbytes.Length))
            {
                Image img = Image.FromStream(ms, true);
                img.Save(System.Web.Hosting.HostingEnvironment.MapPath("~/media/" + FileName));
            }
            user.UserProfileIMG = FileName;
            db.SaveChanges();

            result.Result = true;
            result.msg = "Resim Güncellendi";
            return result;
        }


        #endregion


        #region Banner
        [HttpGet]
        [Route("api/EstatesofUser/{UserId}")]
        public List<BannerModel> ListEstates_of_Users(string UserId)
        {
            List<BannerModel> l = db.Banner.Where(s => s.BannerUserId == UserId).Select(x => new
              BannerModel()
            {
                BannerId = x.BannerId,
                BannerEstateId = x.BannerEstateId,
                BannerUserId = x.BannerUserId

            }).ToList();

            foreach (var banner in l)
            {
                banner.EstateInfo = EstateById(banner.BannerEstateId);
                banner.UserInfo = UserById(banner.BannerUserId);

            }
            return l;

        }

        [HttpGet]
        [Route("api/UsersofEstate/{EstateId}")]
        public List<BannerModel> ListUsers_of_Estate(string EstateId)
        {
            List<BannerModel> l = db.Banner.Where(s => s.BannerEstateId == EstateId).Select(x => new
              BannerModel()
            {
                BannerId = x.BannerId,
                BannerEstateId = x.BannerEstateId,
                BannerUserId = x.BannerUserId

            }).ToList();

            foreach (var banner in l)
            {
                banner.EstateInfo = EstateById(banner.BannerEstateId);
                banner.UserInfo = UserById(banner.BannerUserId);

            }
            return l;

        }
        [Authorize(Roles = "Admin")]
        [HttpPost]
        [Route("api/addbanner")]
        public ResultModel addBanner(BannerModel model)
        {
            if (db.Banner.Count(s => s.BannerEstateId == model.BannerEstateId && s.BannerUserId == model.BannerUserId) > 0)
            {
                result.Result = false;
                result.msg = "Kullanıcı zaten kayıtlıdır.";
                return result;
            }
            Banner NewBanner = new Banner();
            NewBanner.BannerId = Guid.NewGuid().ToString();
            NewBanner.BannerUserId = model.BannerUserId;
            NewBanner.BannerEstateId = model.BannerEstateId;
            db.Banner.Add(NewBanner);
            db.SaveChanges();

            result.Result = true;
            result.msg = "Kayıt eklendi";

            return result;
        }
        [Authorize(Roles = "Admin")]
        [HttpDelete]
        [Route("api/deletebanner/{BannerId}")]
        public ResultModel deleteBanner(string BannerId)
        {
            Banner Bnr = db.Banner.Where(s => s.BannerId == BannerId).SingleOrDefault();

            if (Bnr == null)
            {
                result.Result = false;
                result.msg = "Kayıt bulunamadı";
                return result;
            }
            db.Banner.Remove(Bnr);
            db.SaveChanges();

            result.Result = true;
            result.msg = "Kayıt silindi";
            return result;
        }
        #endregion
        #region Location
        [HttpGet]
        [Route("api/listlocations")]
        public List<LocationModel> listLocations()
        {
            List<LocationModel> list = db.Location.Select(s => new LocationModel()
            {
                LocationId = s.LocationId,
                LocationName = s.LocationName,
            }).ToList();
            return list;
        }
        [HttpGet]
        [Route("api/locationbyId/{LocId}")]
        public LocationModel LocationById(string LocId)
        {
            LocationModel loc = db.Location.Where(s => s.LocationId == LocId).Select(s => new LocationModel()
            {
                LocationId = s.LocationId,
                LocationName = s.LocationName,
            }).SingleOrDefault();
            return loc;
        }
        [Authorize(Roles = "Admin")]
        [HttpPost]
        [Route("api/addlocation")]
        public ResultModel addLocation(LocationModel location)
        {
            if (db.Location.Count(s => s.LocationName == location.LocationName) > 0)
            {
                result.msg = "Bu bölge kayıtlıdır";
                result.Result = false;
                return result;
            }

            Location newloc = new Location
            {
                LocationId = Guid.NewGuid().ToString(),
                LocationName = location.LocationName
            };

            db.Location.Add(newloc);
            db.SaveChanges();
            result.Result = true;
            result.msg = "Bölge Eklendi";
            return result;

        }
        [Authorize(Roles = "Admin")]
        [HttpPut]
        [Route("api/updatelocation")]
        public ResultModel updatelocation(LocationModel model)
        {
            Location entry = db.Location.Where(s=>s.LocationId== model.LocationId).FirstOrDefault();
            if (entry == null)
            {
                result.msg = "kayıt bulunamadı";
                result.Result = false;  
                return result;
            }
            entry.LocationName = model.LocationName;
            db.SaveChanges();
            result.Result= true; 
            result.msg = "Bölge Düzenlendi";
            return result;
        }
        [Authorize(Roles = "Admin")]
        [HttpDelete]
        [Route("api/deletelocation/{LocId}")]
        public ResultModel DeleteLocation(string LocId)
        {
            Location entry = db.Location.Where(s=>s.LocationId==LocId).FirstOrDefault();
            if (entry == null)
            {
                result.Result = false;
                result.msg = "Kayıt Bulunamadı";
                return result;
            }
            if (db.Estate.Count(s=>s.EstateLocationId == LocId) > 0)
            {
                result.msg = "Üzerinde konut kayıtlı lokasyon silinemez!";
                result.Result = false;  
                return result;
            }

            db.Location.Remove(entry);
            db.SaveChanges();
            result.Result = true;
            result.msg = "Bölge Silindi";
            return result;  

        }

        #endregion
    }
}

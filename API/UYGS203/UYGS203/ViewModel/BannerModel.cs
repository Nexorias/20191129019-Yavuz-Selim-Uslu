using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UYGS203.ViewModel
{
    public class BannerModel
    {
        public string BannerId { get; set; }
        public string BannerEstateId { get; set; }
        public string BannerUserId { get; set; }
        public virtual EstateModel EstateInfo { get; set; }
        public virtual UserModel UserInfo { get; set; }
    }
}
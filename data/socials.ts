import { IconType } from "react-icons";
import {
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsWhatsapp,
  BsYoutube,
  BsTwitterX,
  BsTiktok,
} from "react-icons/bs";
import {
  LiaFacebookF,
  LiaInstagram,
  LiaLinkedinIn,
  LiaWhatsapp,
  LiaYoutube,
} from "react-icons/lia";
BsTwitterX;

const socials: { name: string; icon: IconType; href: string }[] = [
  {
    name: "Facebook",
    icon: LiaFacebookF,
    href: "https://www.facebook.com/thewebtechninjas",
  },
  {
    name: "Instagram",
    icon: BsInstagram,
    href: "https://www.instagram.com/webtechninjas",
  },
  //   {
  //     name: "Youtube",
  //     icon: BsYoutube,
  //     href: "https://www.youtube.com/@chrisnortonjr",
  //   },
  //   {
  //     name: "TikTok",
  //     icon: BsTiktok,
  //     href: "https://www.tiktok.com/@christhetechninja",
  //   },
  //   {
  //     name: "Whatsapp",
  //     icon: BsWhatsapp,
  //     href: "https://wa.me/12019193371",
  //   },
  //   {
  //     name: "Linkedin",
  //     icon: LiaLinkedinIn,
  //     href: "https://www.linkedin.com/company/webtechninjas",
  //   },
  //   {
  //     name: "X",
  //     icon: BsTwitterX,
  //     href: "https://twitter.com/christhetechninja",
  //   },
];
export { socials };

export const email = () => {
  if (typeof window !== "undefined") {
    window.open("mailto:contact@chrisnortonjr.com");
  }
};
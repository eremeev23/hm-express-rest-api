import axios from "axios";

const data = {
  for_customers: [
    {
      href: "/account",
      title: "MY ACCOUNT",
    },
    {
      href: "/contacts",
      title: "CONTACTS",
    },
    {
      href: "/privacy",
      title: "LEGAL & PRIVACY",
    },
  ],
  links: [
    {
      href: "https://www.instagram.com/eremeev23/",
      iconName: "InstagramIcon",
    },
    {
      href: "https://t.me/eremeev23",
      iconName: "TelegramIcon",
    },
    {
      href: "https://www.linkedin.com/in/maksim-eremeev-6446101a9/",
      iconName: "LinkedInIcon",
    },
    {
      href: "https://github.com/eremeev23",
      iconName: "GitHubIcon",
    },
  ],
};

export const setFooterData = async () => {
  return await axios.post("http://localhost:8080/api/navigations/footer", data);
};

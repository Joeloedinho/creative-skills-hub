import { Avatar, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import { DiscordIcon, FacebookIcon, InstagramIcon, PinterestIcons, TwitterIcons, YoutubeIcon } from "../../assets";
import { useNavigate } from "react-router-dom";

const socials = [
  {
    name: "Discord",
    icon:  DiscordIcon,
    text: 'Join our community on Discord',
    link: "https://discord.gg/creative-skills-hub",
  },
  {
    name: "Youtube",
    icon: YoutubeIcon,
    text: 'Watch our videos on Youtube',
    link: "https://youtube.com/@creativeskillshub",
  },
  {
    name: "Facebook",
    icon: FacebookIcon,
    text: 'Follow us on Facebook',
    link: "https://www.facebook.com/creativeskillshub/",
  },
  {
    name: "Twitter",
    icon:  TwitterIcons,
    text: 'Follow us on Twitter',
    link: "https://twitter.com/CreativeSkillsHub",
  },
  {
    name: "Instagram",
    icon: InstagramIcon,
    text: 'Follow us on Instagram',
    link: "https://www.instagram.com/creativeskillshub/",
  },
  {
    name: "Pinterest",
    icon:  PinterestIcons,
    text: 'Follow us on Pinterest',
    link: "https://www.pinterest.com/creativeskillshub/",
  },
]

const Footer = () => {
  const navigate = useNavigate()
  return (
    <Box
      sx={{
        padding: { xs: 2, md: 5 },
        backgroundColor: '#030303'
      }}
    >
      <Stack>
        <Typography variant="h6" fontWeight='bold'>Follow Us</Typography>
        <List>
          {
            socials.map((social, index) => {
              return (
                <ListItem disablePadding key={index}>
                  <ListItemButton
                    onClick={() => navigate(social.link)}
                  >
                    <ListItemIcon>
                      <Avatar src={social.icon} sx={{ width: 24, height: 24 }} />
                    </ListItemIcon>
                    <ListItemText primary={social.text} sx={{color: 'white'}}/>
                  </ListItemButton>
                </ListItem>
              )
            })
          }
        </List>
      </Stack>
    </Box>
  );
};

export default Footer;

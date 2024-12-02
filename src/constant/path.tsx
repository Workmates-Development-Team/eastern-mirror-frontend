import { BookImage, Contact, GalleryThumbnails, Home, Newspaper, Settings, SquarePen, User, Users, Video } from "lucide-react";

export const ADMIN_SIDEBAR_LINKS = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: () => <Home className="h-4 w-4" />,
  },

  {
    label: "Post",
    path: "/post",
    icon: () => <Newspaper className="h-4 w-4" />,
    subLinks: [
      {
        label: "All Posts",
        path: "/em-admin/post",
      },
      {
        label: "Add New Post",
        path: "/em-admin/post/add-post",
      },
      {
        label: "Categories",
        path: "/em-admin/post/categories",
      },
    ],
  },
  {
    label: "Videos",
    path: "/videos",
    icon: () => <Video className="h-4 w-4" />,
  },
  {
    label: "Events",
    path: "/events",
    icon: () => <BookImage className="h-4 w-4" />,
  },
  {
    label: "Authors",
    path: "/authors",
    icon: () => <SquarePen className="h-4 w-4" />,
  },
  {
    label: "Users",
    path: "/users",
    icon: () => <Users className="h-4 w-4" />,
  },
  {
    label: "Gallery",
    path: "/gallery",
    icon: () => <GalleryThumbnails className="h-4 w-4" />,
  },
  {
    label: "Contact",
    path: "/contact",
    icon: () => <Contact className="h-4 w-4" />,
  },
  // {
  //   label: "Settings",
  //   path: "/em-admin/settings",
  //   icon: () => <Settings className="h-4 w-4" />,
  //   subLinks: [
  //     {
  //       label: "All Posts",
  //       path: "/em-admin",
  //     },
  //     {
  //       label: "Add New Post",
  //       path: "/em-admin",
  //     },
  //     {
  //       label: "Categories",
  //       path: "/em-admin",
  //     },
  //   ],
  // },
];

export const NAVBAR_LINKS = [
  {
    label: "Home",
    href: "/",
  },

  {
    label: "nagaland",
    href: "/nagaland",
    subLinks: [
      {
        label: "Chümoukedima",
        href: "/chumoukedima",
      },
      {
        label: "Dimapur",
        href: "/dimapur",
      },
      {
        label: "Kiphire",
        href: "/kiphire",
      },
      {
        label: "Kohima",
        href: "/kohima",
      },
      {
        label: "Longleng",
        href: "/longleng",
      },
      {
        label: "Mokokchung",
        href: "/mokokchung",
      },
      {
        label: "Mon",
        href: "/mon",
      },
      {
        label: "Niuland",
        href: "/niuland",
      },
      {
        label: "Noklak",
        href: "/noklak",
      },
      {
        label: "Peren",
        href: "/peren",
      },
      {
        label: "Phek",
        href: "/phek",
      },
      {
        label: "Shamator",
        href: "/shamator",
      },
      {
        label: "Tseminyü",
        href: "/tseminyu",
      },
      {
        label: "Tuensang",
        href: "/tuensang",
      },
      {
        label: "Wokha",
        href: "/wokha",
      },
      {
        label: "Zünheboto",
        href: "/zunheboto",
      },
    ],
  },

  {
    label: "India",
    href: "/india",
  },
  {
    label: "Exclusives",
    href: "/exclusive",
  },
  {
    label: "opinion",
    href: "/editorial",
    // subLinks: [
    //   {
    //     label: "Editorial",
    //     href: "/editorial",
    //   },
    //   {
    //     label: "Letters to the Editor",
    //     href: "/letters-to-the-editor",
    //   },
    // ],
  },

  {
    label: "sports",
    href: "/sports",
  },

  {
    label: "science and tech",
    href: "/science-and-tech",
    // subLinks: [
    //   {
    //     label: "Tech News",
    //     href: "/tech-news",
    //   },
    //   {
    //     label: "Gaming",
    //     href: "/gaming",
    //   },
    //   {
    //     label: "Climate and Environment",
    //     href: "/environment",
    //   },
    // ],
  },

  {
    label: "arts and entertainment",
    href: "/arts-and-entertainment",
   
  },
];

export const FOOTER_LINKS = [
 
  // {
  //   section: "Nagaland Districts",
  //   links: [
  //     {
  //       label: "Chümoukedima",
  //       href: "/chumoukedima",
  //     },
  //     {
  //       label: "Dimapur",
  //       href: "/dimapur",
  //     },
  //     {
  //       label: "Kiphire",
  //       href: "/kiphire",
  //     },
  //     {
  //       label: "Kohima",
  //       href: "/kohima",
  //     },
  //     {
  //       label: "Longleng",
  //       href: "/longleng",
  //     },
  //     {
  //       label: "Mokokchung",
  //       href: "/mokokchung",
  //     },
  //     {
  //       label: "Mon",
  //       href: "/mon",
  //     },
  //     {
  //       label: "Niuland",
  //       href: "/niuland",
  //     },
  //     {
  //       label: "Noklak",
  //       href: "/noklak",
  //     },
  //     {
  //       label: "Peren",
  //       href: "/peren",
  //     },
  //     {
  //       label: "Phek",
  //       href: "/phek",
  //     },
  //     {
  //       label: "Shamator",
  //       href: "/shamator",
  //     },
  //     {
  //       label: "Tseminyü",
  //       href: "/tseminyu",
  //     },
  //     {
  //       label: "Tuensang",
  //       href: "/tuensang",
  //     },
  //     {
  //       label: "Wokha",
  //       href: "/wokha",
  //     },
  //     {
  //       label: "Zünheboto",
  //       href: "/zunheboto",
  //     },
  //   ],
  // },
  {
    section: "Popular Sections",
    links: [
      {
        label: "EM Exclusive",
        href: "/em-exclusive",
      },
      {
        label: "Education",
        href: "/education",
      },
      {
        label: "Editor's Pick",
        href: "/editor's-pick",
      },
      {
        label: "Health",
        href: "/health",
      },
    ],
  },
  {
    section: "News",
    links: [
      {
        label: "World",
        href: "/world",
      },
      {
        label: "India",
        href: "/india",
      },
      {
        label: "Northeast India",
        href: "/northeast-india",
      },
      {
        label: "News in Brief",
        href: "/news-in-brief",
      },
    ],
  },
  {
    section: "OPINIONS",
    links: [
      {
        label: "Editorial",
        href: "/editorial",
      },
      {
        label: "Views & Reviews",
        href: "/views-reviews",
      },
      {
        label: "Op-Ed",
        href: "/op-ed",
      },
      {
        label: "Book Reviews",
        href: "/book-reviews",
      },
    ],
  },
  {
    section: "Entertainment",
    links: [
      {
        label: "Rhythm of Love",
        href: "/rhythm-of-love",
      },
      {
        label: "Music",
        href: "/music",
      },
      {
        label: "Film",
        href: "/film",
      },
    ],
  },
  {
    section: "Others",
    links: [
      {
        label: "Videos",
        href: "/videos",
      },
      {
        label: "Business",
        href: "/business",
      },
      {
        label: "Science and Tech",
        href: "/science-and-tech",
      },
      {
        label: "Sports",
        href: "/sports",
      },
    ],
  },

  {
    section: "Eastern Mirror",
    links: [
      {
        label: "About Us",
        href: "/about-us",
      },
      {
        label: "Contact Us",
        href: "/contact-us",
      },
      // {
      //   label: "Advertise with Us",
      //   href: "/advertisment",
      // },
    ],
  },
];

import { DiscoverLogo, HomeLogo, MicroLogo, ProfileLogo } from "@/shared"

interface ISidebarLinks {
  imgUrl: string
  route: string
  label: string
}
export const publicLinks: ISidebarLinks[] = [
  {
    imgUrl: HomeLogo,
    route: '/',
    label: 'Главная'
  },
  {
    imgUrl: DiscoverLogo,
    route: '/discover',
    label: 'Поиск'
  },
  {
    imgUrl: MicroLogo,
    route: '/create-podcast',
    label: 'Создать подкаст'
  }
]
export const privateLinks: ISidebarLinks[] = [
  {
      imgUrl: HomeLogo,
      route: '/',
      label: 'Главная'
    },
    {
      imgUrl: DiscoverLogo,
      route: '/discover',
      label: 'Поиск'
    },
    {
      imgUrl: MicroLogo,
      route: '/create-podcast',
      label: 'Создать подкаст'
    },
    {
      imgUrl: ProfileLogo,
      route: '/my-profile',
      label: 'Профиль'
    }
  ]


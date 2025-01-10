import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import {
  LeaderboardIcon,
  DashboardIcon,
  DocumentIcon,
  GalleryIcon,
  HierarchyIcon,
  MessageIcon,
  HelpIcon,
  SettingIcon,
  NotificationIcon,
  MenuIcon,
  BinIcon,
  CloseEyeIcon,
  DownArrowIcon,
  EyeIcon,
  FilterIcon,
  LeftArrowIcon,
  LogoIcon,
  PenIcon,
  PlusIcon,
  RightArrowIcon,
  SearchIcon
} from '@assets/icons'
import React from 'react'

describe('Icon components', () => {
  const iconProps = {
    width: '24',
    height: '24',
    fill: '#757575'
  }

  const icons = [
    { name: 'LeaderboardIcon', component: LeaderboardIcon },
    { name: 'DashboardIcon', component: DashboardIcon },
    { name: 'DocumentIcon', component: DocumentIcon },
    { name: 'GalleryIcon', component: GalleryIcon },
    { name: 'HierarchyIcon', component: HierarchyIcon },
    { name: 'MessageIcon', component: MessageIcon },
    { name: 'HelpIcon', component: HelpIcon },
    { name: 'SettingIcon', component: SettingIcon },
    { name: 'MenuIcon', component: MenuIcon },
    { name: 'SearchIcon', component: SearchIcon },
    { name: 'DownArrowIcon', component: DownArrowIcon },
    { name: 'BinIcon', component: BinIcon },
    { name: 'PenIcon', component: PenIcon },
    { name: 'NotificationIcon', component: NotificationIcon },
    { name: 'PlusIcon', component: PlusIcon },
    { name: 'FilterIcon', component: FilterIcon },
    { name: 'LeftArrowIcon', component: LeftArrowIcon },
    { name: 'RightArrowIcon', component: RightArrowIcon },
    { name: 'EyeIcon', component: EyeIcon },
    { name: 'CloseEyeIcon', component: CloseEyeIcon },
    { name: 'MenuIcon', component: MenuIcon },
    { name: 'LogoIcon', component: LogoIcon }
  ]

  icons.forEach(({ name, component }) => {
    test(`${name} renders width and height correctly`, () => {
      const { container } = render(React.createElement(component, iconProps))
      const svg = container.querySelector('svg')

      expect(svg).toBeInTheDocument()
      expect(svg).toHaveAttribute('width', iconProps.width)
      expect(svg).toHaveAttribute('height', iconProps.height)
    })
  })

  test('LeaderboardIcon renders with custom fill', () => {
    const { container } = render(<LeaderboardIcon {...iconProps} />)
    const svg = container.querySelector('svg')

    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('fill', iconProps.fill)

    const path = svg?.querySelector('path')
    expect(path).toHaveAttribute('fill', iconProps.fill)
    expect(path).toHaveAttribute('stroke', iconProps.fill)
  })

  test('DashboardIcon renders with custom fill', () => {
    const { container } = render(<DashboardIcon {...iconProps} />)
    const svg = container.querySelector('svg')

    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('fill', iconProps.fill)

    const path = svg?.querySelector('path')
    expect(path).toHaveAttribute('fill', iconProps.fill)
    expect(path).toHaveAttribute('stroke', iconProps.fill)
  })

  test('DocumentIcon renders with custom fill', () => {
    const { container } = render(<DocumentIcon {...iconProps} />)
    const svg = container.querySelector('svg')

    expect(svg).toBeInTheDocument()

    const paths = svg?.querySelectorAll('path')
    paths?.forEach((path) => {
      expect(path).toHaveAttribute('stroke', iconProps.fill)
    })
  })

  test('GalleryIcon renders with custom fill', () => {
    const { container } = render(<GalleryIcon {...iconProps} />)
    const svg = container.querySelector('svg')

    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('fill', iconProps.fill)

    const paths = svg?.querySelectorAll('path')
    paths?.forEach((path) => {
      expect(path).toHaveAttribute('fill', iconProps.fill)
    })
  })

  test('HierarchyIcon renders with custom fill', () => {
    const { container } = render(<HierarchyIcon {...iconProps} />)
    const svg = container.querySelector('svg')

    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('fill', iconProps.fill)

    const path = svg?.querySelector('path')
    expect(path).toHaveAttribute('fill', iconProps.fill)
  })

  test('MessageIcon renders with custom fill', () => {
    const { container } = render(<MessageIcon {...iconProps} />)
    const svg = container.querySelector('svg')

    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('fill', iconProps.fill)

    const path = svg?.querySelector('path')
    expect(path).toHaveAttribute('fill', iconProps.fill)
  })

  test('HelpIcon renders with custom fill', () => {
    const { container } = render(<HelpIcon {...iconProps} />)
    const svg = container.querySelector('svg')

    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('fill', iconProps.fill)

    const path = svg?.querySelector('path')
    expect(path).toHaveAttribute('fill', iconProps.fill)
  })

  test('SettingIcon renders with custom fill', () => {
    const { container } = render(<SettingIcon {...iconProps} />)
    const svg = container.querySelector('svg')

    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('fill', iconProps.fill)

    const path = svg?.querySelector('path')
    expect(path).toHaveAttribute('fill', iconProps.fill)
  })

  test('SearchIcon renders with custom fill', () => {
    const { container } = render(<SearchIcon {...iconProps} />)
    const svg = container.querySelector('svg')

    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('fill', iconProps.fill)

    const path = svg?.querySelector('path')
    expect(path).toHaveAttribute('fill', iconProps.fill)
  })

  test('DownArrowIcon renders with custom fill', () => {
    const { container } = render(<DownArrowIcon {...iconProps} />)
    const svg = container.querySelector('svg')

    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('fill', iconProps.fill)

    const path = svg?.querySelector('path')
    expect(path).toHaveAttribute('fill', iconProps.fill)
  })

  test('BinIcon renders with custom fill', () => {
    const { container } = render(<BinIcon {...iconProps} />)
    const svg = container.querySelector('svg')

    expect(svg).toBeInTheDocument()

    const path = svg?.querySelector('path')
    expect(path).toHaveAttribute('fill', iconProps.fill)
  })

  test('PenIcon renders with custom fill', () => {
    const { container } = render(<PenIcon {...iconProps} />)
    const svg = container.querySelector('svg')

    expect(svg).toBeInTheDocument()

    const path = svg?.querySelector('path')
    expect(path).toHaveAttribute('fill', iconProps.fill)
  })

  test('NotificationIcon renders with custom fill', () => {
    const { container } = render(<NotificationIcon {...iconProps} />)
    const svg = container.querySelector('svg')

    expect(svg).toBeInTheDocument()

    const circle = svg?.querySelector('circle')
    expect(circle).toHaveAttribute('fill', iconProps.fill)
  })

  test('PlusIcon renders with custom fill', () => {
    const { container } = render(<PlusIcon {...iconProps} />)
    const svg = container.querySelector('svg')

    expect(svg).toBeInTheDocument()

    const path = svg?.querySelector('path')
    expect(path).toHaveAttribute('fill', iconProps.fill)
  })

  test('FilterIcon renders with custom fill', () => {
    const { container } = render(<FilterIcon {...iconProps} />)
    const svg = container.querySelector('svg')

    expect(svg).toBeInTheDocument()

    const path = svg?.querySelector('path')
    expect(path).toHaveAttribute('fill', iconProps.fill)
  })

  test('LeftArrowIcon renders with custom fill', () => {
    const { container } = render(<LeftArrowIcon {...iconProps} />)
    const svg = container.querySelector('svg')

    expect(svg).toBeInTheDocument()

    const paths = svg?.querySelectorAll('path')
    paths?.forEach((path) => {
      expect(path).toHaveAttribute('stroke', iconProps.fill)
    })
  })

  test('RightArrowIcon renders with custom fill', () => {
    const { container } = render(<RightArrowIcon {...iconProps} />)
    const svg = container.querySelector('svg')

    expect(svg).toBeInTheDocument()

    const paths = svg?.querySelectorAll('path')
    paths?.forEach((path) => {
      expect(path).toHaveAttribute('stroke', iconProps.fill)
    })
  })

  test('EyeIcon renders with custom fill', () => {
    const { container } = render(<EyeIcon {...iconProps} />)
    const svg = container.querySelector('svg')

    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('fill', iconProps.fill)
  })

  test('CloseEyeIcon renders with custom fill', () => {
    const { container } = render(<CloseEyeIcon {...iconProps} />)
    const svg = container.querySelector('svg')

    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('fill', iconProps.fill)
  })

  test('MenuIcon renders with custom fill', () => {
    const { container } = render(<MenuIcon {...iconProps} />)
    const svg = container.querySelector('svg')

    expect(svg).toBeInTheDocument()

    const path = svg?.querySelector('path')
    expect(path).toHaveAttribute('fill', iconProps.fill)
  })

  test('LogoIcon renders with custom fill', () => {
    const { container } = render(<CloseEyeIcon {...iconProps} />)
    const svg = container.querySelector('svg')

    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('fill', iconProps.fill)
  })
})

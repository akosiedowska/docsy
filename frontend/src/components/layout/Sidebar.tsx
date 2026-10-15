import { ActionIcon, Group, NavLink, Tooltip } from '@mantine/core'
import { Link, useMatchRoute } from '@tanstack/react-router'
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'

import { type SidebarLink } from '../../app/sidebarLinks'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
  links: SidebarLink[]
}

const Sidebar = ({ collapsed, onToggle, links }: SidebarProps) => {
  const matchRoute = useMatchRoute()

  return (
    <>
      <Group justify='end'>
        <ActionIcon
          variant='subtle'
          color='gray'
          onClick={onToggle}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
        </ActionIcon>
      </Group>
      {links.map((l) => (
        <Tooltip label={l.label} position='right' disabled={!collapsed} key={l.to}>
          <NavLink
            component={Link}
            to={l.to}
            label={l.label}
            leftSection={<l.icon size={20} />}
            activeOptions={{ exact: true }}
            active={!!matchRoute({ to: l.to })}
          />
        </Tooltip>
      ))}
    </>
  )
}

export default Sidebar

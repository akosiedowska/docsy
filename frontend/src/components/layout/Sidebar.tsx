import { Group, NavLink, Tooltip } from '@mantine/core'
import { Link, useMatchRoute } from '@tanstack/react-router'
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'

import { type SidebarLink } from '../../app/sidebarLinks'
import { palette } from '../../styles/colors'

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
        {collapsed ? <PanelLeftOpen onClick={onToggle} /> : <PanelLeftClose onClick={onToggle} />}
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

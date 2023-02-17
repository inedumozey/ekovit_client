import HomeIcon from '@mui/icons-material/Home';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import Groups2Icon from '@mui/icons-material/Groups2';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SettingsIcon from '@mui/icons-material/Settings';

const links = (router, isAdmin, isAgent) => {
    return [
        { name: "Home", url: '/', icon: HomeIcon, show: true },

        // not seen in services
        { name: "Services", url: '/services/drugs', icon: ContactPageIcon, show: true && !router.pathname.includes('/services') },

        // only seen in services
        { name: "Provisions", url: '/services/provisions', icon: ContactPageIcon, show: true && router.pathname.includes('/services') },
        { name: "Drugs", url: '/services/drugs', icon: Groups2Icon, show: true && router.pathname.includes('/services') },

        // not seen in pos
        { name: "POS", url: '/pos', icon: WorkHistoryIcon, show: isAgent },

        // not seen in admin
        { name: "Admin", url: '/admin/inventory', icon: PersonOutlineIcon, show: isAdmin && !router.pathname.includes('/admin') },

        // only seen in admin
        { name: "Config", url: '/admin/config', icon: SettingsIcon, show: isAdmin && router.pathname.includes('/admin') },
        { name: "Users", url: '/admin/users', icon: Groups2Icon, show: isAdmin && router.pathname.includes('/admin') },

        // not seen in inventory
        { name: "Inventory", url: '/admin/inventory', icon: AddBusinessIcon, show: isAdmin && router.pathname.includes('/admin') },

        // only seen in inventory
        { name: "Add Inventory", url: '/admin/inventory/add', icon: AddBusinessIcon, show: isAdmin && router.pathname.includes('/admin/inventory') },
    ]
}

export default links
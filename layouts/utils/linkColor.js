const linkColor = (router, link, toggleState) => {
    if (router.pathname === link.url) {
        if (toggleState) {
            return { color: 'var(--active-link-lighttheme)' }
        } else {
            return { color: 'var(--active-link-darktheme)' }
        }
    }

    else if (router.pathname.includes('/admin/inventory') && link.url === '/admin/inventory' && router.pathname !== '/admin/inventory/add') {
        if (toggleState) {
            return { color: 'var(--active-link-lighttheme)' }
        } else {
            return { color: 'var(--active-link-darktheme)' }
        }
    }

    else if (router.pathname.includes('/admin/users') && link.url === '/admin/users') {
        if (toggleState) {
            return { color: 'var(--active-link-lighttheme)' }
        } else {
            return { color: 'var(--active-link-darktheme)' }
        }
    }

    else if (router.pathname.includes('/services/drugs') && link.url === '/services/drugs') {
        if (toggleState) {
            return { color: 'var(--active-link-lighttheme)' }
        } else {
            return { color: 'var(--active-link-darktheme)' }
        }
    }


    else if (router.pathname.includes('/services/provisions') && link.url === '/services/provisions') {
        if (toggleState) {
            return { color: 'var(--active-link-lighttheme)' }
        } else {
            return { color: 'var(--active-link-darktheme)' }
        }
    }

    else {
        if (toggleState) {
            return { color: 'var(--link-lighttheme)' }
        } else {
            return { color: 'var(--link-darktheme)' }
        }
    }
}

export default linkColor;
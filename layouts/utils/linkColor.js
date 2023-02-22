const linkColor = (router, link, toggleState, type = "") => {
    if (type === 'mobile') {
        if (router.pathname.includes('/admin') && link.url.includes('/admin')) {
            if (toggleState) {
                return { color: 'var(--active-link-lighttheme)' }
            } else {
                return { color: 'var(--active-link-darktheme)' }
            }
        }


        if (router.pathname.includes('/') && link.url.includes('/') && (!router.pathname.includes('/admin') || router.pathname.includes('/pos') || !router.pathname.includes('/services'))) {
            if (toggleState) {
                return { color: 'var(--active-link-lighttheme)' }
            } else {
                return { color: 'var(--active-link-darktheme)' }
            }
        }


        else if (router.pathname.includes('/pos') && link.url.includes('/pos')) {
            if (toggleState) {
                return { color: 'var(--active-link-lighttheme)' }
            } else {
                return { color: 'var(--active-link-darktheme)' }
            }
        }

        else {
            if (toggleState) {
                return { color: 'var(--title-lighttheme)' }
            } else {
                return { color: 'var(--title-darktheme)' }
            }
        }
    }

    else {
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

        else if (router.pathname.includes('/') && link.url.includes('/') && (!link.url.includes('/admin') && !link.url.includes('/pos') && !link.url.includes('/services')) && !router.pathname.includes('/admin') && !router.pathname.includes('/pos') && !router.pathname.includes('/services')) {
            if (toggleState) {
                return { color: 'var(--active-link-lighttheme)' }
            } else {
                return { color: 'var(--active-link-darktheme)' }
            }
        }

        else {
            if (toggleState) {
                return { color: 'var(--title-lighttheme)' }
            } else {
                return { color: 'var(--title-darktheme)' }
            }
        }
    }
}

export default linkColor;
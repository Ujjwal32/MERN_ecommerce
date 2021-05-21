import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core'
import { AccountCircleOutlined } from '@material-ui/icons'
import React from 'react'
import adminStyle from './dashboard.module.css'
import ListIcon from '@material-ui/icons/List';
import ShopIcon from '@material-ui/icons/Shop';
import CategoryIcon from '@material-ui/icons/Category';
import { Link } from 'react-router-dom';

function DashboardSidebar() {
    return (
        <div className={adminStyle.sidebar}>
            <Typography variant='h5' style={{textAlign: 'center'}} gutterBottom={true}>Menus</Typography>
            <List component="nav" aria-label="main mailbox folders">
                <Link to='/admin/products'>
                    <ListItem button>
                    <ListItemIcon>
                        <ListIcon />
                    </ListItemIcon>
                    <ListItemText primary="Products" />
                    </ListItem>
                </Link>
                <Link to='/admin/users'>
                    <ListItem button>
                    <ListItemIcon>
                        <AccountCircleOutlined />
                    </ListItemIcon>
                    <ListItemText primary="Users" />
                    </ListItem>
                </Link>
                <Link to='/admin/category'>
                    <ListItem button>
                    <ListItemIcon>
                        <CategoryIcon />
                    </ListItemIcon>
                    <ListItemText primary="Category" />
                    </ListItem>
                </Link>
                <ListItem button>
                <ListItemIcon>
                    <ShopIcon />
                </ListItemIcon>
                <ListItemText primary="Orders" />
                </ListItem>
            </List>
        </div>
    )
}

export default DashboardSidebar

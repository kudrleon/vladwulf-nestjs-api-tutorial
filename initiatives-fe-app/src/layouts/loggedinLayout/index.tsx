import { AppBar, Box, Button, LinearProgress, Menu, MenuItem, Toolbar, Typography } from "@mui/material"
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom"
import { logout, setUser } from "../../features/auth/authSlice"

import HomeIcon from "@mui/icons-material/Home"
import React from "react"
import { useAppDispatch } from "../../app/hooks"
import { useEffect } from "react"
import { useGetCurrentUserProfileQuery } from "../../features/auth/usersAPISlice"

export const LoggedInLayout = () => {
  const { data, isFetching } = useGetCurrentUserProfileQuery("userDetails", {
    // perform a refetch every 5mins
    pollingInterval: 300000,
    
  })
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (data) dispatch(setUser(data))
  }, [data])
  if (isFetching) {
    return <LinearProgress />
  }
  if (data && (data.firstName === null || data.lastName === null) && window.location.pathname !== "/profile") {
    return <Navigate to="/profile" />
  }
  return [
    <AppBar position="fixed" sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <HomeIcon
          sx={{ cursor: "pointer" }}
          onClick={() => {
            window.location.href = "/"
          }}
        />
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        ></Typography>

        <Typography
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{ 
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          Hello {data?.firstName} {data?.lastName}
        </Typography>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={() => navigate('/profile')}>
            Profile
          </MenuItem>
          <MenuItem onClick={() => { 
            dispatch(logout())
            window.location.href = "/"
            }}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>,
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "top",
        height: "100vh",
      }}
    >
      <Box
        component="nav"
        sx={{ width: 240, flexShrink: { sm: 0 } }}
        aria-label="left navigation"
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          paddingTop: "70px",
          width: { sm: `calc(100% - 240px)` },
        }}
      >
        <Outlet />
      </Box>
    </Box>,
  ]
}

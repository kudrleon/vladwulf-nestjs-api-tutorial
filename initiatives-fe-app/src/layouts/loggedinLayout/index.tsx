import { AppBar, Box, Toolbar, Typography } from "@mui/material"
import { Navigate, Outlet } from "react-router-dom"

import { setUser } from "../../features/auth/authSlice"
import { useAppDispatch } from "../../app/hooks"
import { useEffect } from "react"
import { useGetCurrentUserProfileQuery } from "../../features/auth/usersAPISlice"

export const LoggedInLayout = () => {
  const { data, isFetching } = useGetCurrentUserProfileQuery("userDetails", {
    // perform a refetch every 5mins
    pollingInterval: 300000,
  })
  const dispatch = useAppDispatch();
  useEffect(() => {
    if(data) dispatch(setUser(data))
  }, [data])
  if (data && (data.firstName === null || data.lastName === null)) {
    return <Navigate to="/first-login" />
  }
  return [
    <AppBar position="fixed" sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        ></Typography>
        <Typography>
          Hello {data?.firstName} {data?.lastName}
        </Typography>
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

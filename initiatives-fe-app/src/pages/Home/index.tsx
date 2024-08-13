import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar
} from "@mui/material"

import CreateIcon from "@mui/icons-material/Create"
import { Requests } from "../../features/requests/Requests"
import { useNavigate } from "react-router-dom"

export const Home = () => {
  const navigate = useNavigate()

  return (
    <div>
      {/* If same Drawer will be repeated not only in home and create request maybe worth to create additional layout around routes using this variant */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
        open
      >
        <div>
          <Toolbar />
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <CreateIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"Create a request"}
                  onClick={() => navigate("/new-request")}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </div>
      </Drawer>
      <Requests />
    </div>
  )
}

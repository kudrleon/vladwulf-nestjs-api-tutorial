import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material"

import { useGetUserQuery } from "../../features/auth/usersAPISlice"

export const RequestCard = ({ title, owner, userId }: any) => {

  const { data, isFetching } = useGetUserQuery(userId, {
    // perform a refetch every 5mins
    pollingInterval: 300000,
  });
  console.log(data, { title, owner, userId });
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ 
            height: 140,
            backgroundSize: "contain",
        }}
        image="https://media.tenor.com/xQ2xI0v5bVAAAAAe/nothing-to-add-rege-jean-page.png"
        title="No files added"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            Created By: {isFetching ? "Loading..." : `${data?.firstName} ${data?.lastName}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Assigned to: {owner}
        </Typography>
      </CardContent>
    </Card>
  )
}

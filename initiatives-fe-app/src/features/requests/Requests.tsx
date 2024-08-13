import "./Requests.module.css"

import { Box, LinearProgress } from "@mui/material"

import { RequestCard } from "../../components/RequestCard"
import { useGetRequestsQuery } from "./requestsAPISlice"

export const Requests = () => {
  const { data, isFetching } = useGetRequestsQuery("projects", {
    // perform a refetch every 5mins
    pollingInterval: 300000,
  })
  return (
    <div>
      {isFetching && <LinearProgress />}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "left",
          padding: 2,
        }}
      >
        {data && data.length > 0 ? (
          data.map((project: any) => (
            <RequestCard
              key={project.id}
              title={project.title}
              owner={project.businessOwner}
              userId={project.userId}
            />
          ))
        ) : (
          <div>
            You don't have any projects, you can create one with "Create a
            request" button
          </div>
        )}
      </Box>
    </div>
  )
}

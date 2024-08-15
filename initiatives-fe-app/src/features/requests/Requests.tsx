import "./Requests.module.css"

import { Box, LinearProgress } from "@mui/material"

import { RequestCard } from "../../components/RequestCard"
import { useGetRequestsQuery } from "./requestsAPISlice"
import { useNavigate } from "react-router-dom"

export const Requests = () => {
  const { data, isFetching } = useGetRequestsQuery("projects", {
    // perform a refetch every 5mins
    pollingInterval: 300000,
  })
  const navigate = useNavigate()
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
          data.map((request: any) => (
            <RequestCard
              key={`${request.id}`}
              title={request.title}
              owner={request.businessOwner}
              userId={request.userId}
              onClick={() => navigate(`/request/${request.id}`)}
            />
          ))
        ) : (
          <div>
            You don't have any requests, you can create one with "Create a
            request" button
          </div>
        )}
      </Box>
    </div>
  )
}

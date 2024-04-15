// tally
const tallyApiUrl = import.meta.env.PUBLIC_TALLY_API_URL;
const tallyApiKey = import.meta.env.PUBLIC_TALLY_API_KEY;

// snapshot
const snapshotApiUrl = "https://hub.snapshot.org/graphql";
const snapshotApiKey = import.meta.env.PUBLIC_SNAPSHOT_API_KEY;

export type API = "TALLY" | "SNAPSHOT";

export const chainId = "eip155:42161";

export const governanceId =
  "eip155:42161:0xf07DeD9dC292157749B6Fd268E37DF6EA38395B9";

export const fetcher = ({
  api = "TALLY",
  query,
  variables,
}: {
  api: API;
  query: any;
  variables: any;
}) => {
  return fetch(api === "TALLY" ? tallyApiUrl : snapshotApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Api-Key": api === "TALLY" ? tallyApiKey : undefined,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      if (json?.errors) {
        console.error("error when fetching");

        return null;
      }

      return json.data;
    })
    .catch((error) => {
      console.log("Error when fetching =>", error);

      return null;
    });
};

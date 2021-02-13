const initialState = {
  token: "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTU2MjY2NjUsImp0aSI6ImI3YTBkYjI1LWZjZWQtNDFhYS1hZGZiLTE4YmE0MTkyZDNhNSIsImlhdCI6MTYxMzAzNDY2NSwiaXNzIjoic3RvbGlrYXBwLmNvbSIsInN1YiI6IjU0OGVkZDE4LTZlNjgtNDJiYi05Y2Q1LThiZWE3MTU3MzdhYSJ9.pNl2tEFvbXd08ust7umpafyyKqqQsWskKSFTfHmkyeoQMDXpXMvaI8YRa2CpWaTVE9A9VHZaWxV9OgJNYC28FTa_tP1rk-j3OfOD48G5QsvToSGEzKXKK8aeTAxP0-UCt49Qep7IrovoEk0B0J8qtVou-PZKn0EgDWsx0_JlllEZjoziZPpp2xSogIkfgpaLwr_unwMFk2YxDedVrLY4CoYBRg3bHurJn4yt8UrQoNqqTz6LwsdK1l_RBL6lmh6X5FFAqdz7MyIL9nlRtKR_wgm1nHJmvQy4MmrPaWSCPiYLivnsiI88-DmGna7qC2HGbnx5rzz8Q8nSTn1JguZ_Dg",
  user_guid: null,
  lang: localStorage.getItem('lang') || 'ru',
  city: null
  // city: "e3bb5e76-014c-4dcf-90f6-fc4b5e827558" // Ташкент
}

const User = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LANG": {
      localStorage.setItem('lang', action.lang)
      return {
        ...state,
        lang: action.lang
      }
    }

    case "SET_CITY": {
      return {
        ...state,
        city: action.city
      }
    }

    default:
      return state;
  }
}


export default User;
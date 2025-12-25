export const Queries = {
  basicData: `
    query BasicData {
      user {
        id
        login
      }
    }
  `,

  skills: `
    query Skills($userId: Int!) {
      user: user_by_pk(id: $userId) {
        transactions(
          order_by: [{ type: desc }, { amount: desc }]
          distinct_on: [type]
          where: { userId: { _eq: $userId }, type: { _like: "skill_%" } }
        ) {
          type
          amount
        }
      }
    }
  `,

  userDetails: `
    query UserDetails($userId: Int!) {
      user: user_by_pk(id: $userId) {
        login
        city: attrs(path: "$.city")
        gender: attrs(path: "$.gender")
        country: attrs(path: "$.country")
        firstName: attrs(path: "$.firstName")
        arabicFirstName: attrs(path: "$.arabicFirstName")
        lastName: attrs(path: "$.lastName")
        arabicLastName: attrs(path: "$.arabicLastName")
        addressCity: attrs(path: "$.addressCity")
        placeOfBirth: attrs(path: "$.placeOfBirth")
        arabicPlaceOfBirth: attrs(path: "$.arabicPlaceOfBirth")
        addressStreet: attrs(path: "$.addressStreet")
        arabicAddressStreet: attrs(path: "$.arabicAddressStreet")
        avatarUrl: attrs(path: "$.avatarUrl")
       labels (where :{eventId : {_is_null : false }}) {
          labelName
          labelId
          eventId
        }
      }
    }
  `,

  auditRatio: `  query auditRatio($userId: Int!) {
    user: user_by_pk(id: $userId) {
        auditRatio
        totalUp
        totalUpBonus
        totalDown
       }
    }`,


  level: `query level {
   level: transaction(
    where: {eventId: {_eq: 41}, type: {_eq: "level"}}
    order_by: {createdAt: desc}
		limit:1
  ) {
    amount
  }
}
`,

  xpProgress: `query xpProgress{
  transaction(
    where: {eventId: {_eq: 41}, type: {_eq: "xp"}}
    order_by: {createdAt: asc}
  ) {
    amount
    object {
      type
      name
    }
    createdAt
  }
}`
};

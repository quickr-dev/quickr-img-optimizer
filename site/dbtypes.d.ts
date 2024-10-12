interface Customer {
  id: number
  userId: string
  remainingFreeQuota: number
  plan: string
  planStartDate: string
  createdAt: number
}

interface Transformation {
  id: number
  subdomainId: number
  pathname: string
  createdAt: number
}

interface Subdomain {
  id: number
  customerId: string
  slug: string
  subdomain: string
  imageDomains: string
  createdAt: number
}

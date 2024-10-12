export const getCustomer = async (DB: D1Database, userId: string) => {
  const customer = await DB.prepare(`SELECT * FROM Customer WHERE Customer.userId = ?`)
    .bind(userId)
    .first<Customer>()
  if (!customer) {
    throw new Error("Customer not found")
  }
  return customer
}

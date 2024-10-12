-- Migration number: 0001 	 2024-10-09T21:50:13.125Z

CREATE TABLE Customer (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId TEXT NOT NULL,
  remainingFreeQuota INT NOT NULL default 999,
  plan TEXT NOT NULL default('free'), -- 'free', 'pay-as-you-go'
  planStartDate TEXT NOT NULL default (strftime('%Y-%m-%d', 'now')),
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Subdomain (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customerId TEXT NOT NULL,
  slug TEXT NOT NULL,
  imageDomains TEXT NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Transformation (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  subdomainId INTEGER NOT NULL,
  pathname TEXT NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idxCustomerUserId ON Customer (userId);
CREATE INDEX idxSubdomainCustomerId ON Subdomain (customerId);
CREATE UNIQUE INDEX idxSubdomainSlug ON Subdomain (slug);
CREATE INDEX idxTransformationSubdomainId ON Transformation (subdomainId);
CREATE INDEX idxTransformationPathname ON Transformation (pathname);

-- Migration number: 0001 	 2024-10-09T21:50:13.125Z

CREATE TABLE Customer (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL,
  allowedDomains TEXT NOT NULL,
  remainingQuota INT NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  UNIQUE (slug)
);

CREATE TABLE Transformation (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customerId INTEGER NOT NULL,
  pathname TEXT NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  billablePeriod TEXT NOT NULL DEFAULT (strftime('%Y-%m', 'now')),

  UNIQUE (customerId, billablePeriod, pathname)
);

CREATE INDEX idxTransformationCustomerId ON Transformation (customerId);

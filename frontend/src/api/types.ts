export type ValidationIssue = {
  instancePath: string
  message: string
}

export type ApiErrorResponse = {
  message: string
  issues?: ValidationIssue[]
}

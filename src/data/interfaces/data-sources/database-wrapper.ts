export interface DatabaseWraper {
  find(query: object): Promise<any[]>;
  insertOne(doc: any): Promise<any>;
}

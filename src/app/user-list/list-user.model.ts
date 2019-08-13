export class ListUser {
  public id: number; 
  public name: string; 
  public role: string; 
  public email: string; 
  public state: string; 
  public avatar: string;

  constructor(id: number, name: string, role: string, email: string, state: string, avatar: string){
    this.id = id;
    this.name = name;
    this.role = role;
    this.email = email;
    this.state = state;
    this.avatar = avatar;
  }
}
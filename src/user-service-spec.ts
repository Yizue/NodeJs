//-------------------------------------------------
// src/user-service-spec.ts
//-------------------------------------------------
import { UserService } from './user-service';

describe("UserService getUsers method test case", ()=> {
  // For storing UserService instance
  let userService: UserService;

  // For every test case we need UserService instance so before running each test case the UserService instance will be created
   beforeEach(() => {
     userService = new UserService();
   });
   
   // Test case to ensure getUsers method is defined
   it('Should be defined', () => {
      expect(userService.getUsers()).toBeDefined('getUsers method should be defined');
   });

   // Test case to ensure getUsers method returns Array object
   it('Should return Array', () => {
      expect(userService.getUsers()).toEqual(jasmine.arrayContaining([]), 'getUsers method should return Array object');
   });

   // Test case to ensure getUsers method returns Array containing specific object property and value
   it('Should return Array containing "name" property and value as "admin"', () => {
      expect(userService.getUsers()).toContain({'name': 'admin'}, 'getUsers method expect Array containing "name" property and value as "admin"');
   });
});
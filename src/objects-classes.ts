describe("Testing Objects", () => {
    
    /* An object is a collection of properties, and a property is an association between a name (or key) and a value. 
    A property's value can be a function, in which case the property is known as a method. */
    it("should be able to define an object using a literal", function() {
        const obj = {
            property1: 'value1', // property name may be an identifier
            2: 2, // or a number
            "property n": 'value3', // or a string
          };      
          
        const myHonda = {
            color: "red",
            wheels: 4,
            engine: { cylinders: 4, size: 2.2 } // Object vaulue can be itself also an object
        };
         
        expect(obj.property1).toBe('value1'); // Use . to access obj's properties' value
        expect(myHonda.engine.cylinders).toBe(4);
    });

    it("should use constructor function to define an object", function() {
        function Car(make, model, year) { // constructor function, can also use class syntax to setup constructor, see class-spec
            this.make = make;
            this.model = model;
            this.year = year;
        }

        const myCar = new Car("Eagle", "Talon TSi", 1993);
          
        expect(myCar['make']).toEqual('Eagle'); // Alternate way of accessing a property's value
    });

    it("should create obj using create function", function() {
        // Animal properties and method encapsulation
        const Animal = {
            type: "Invertebrates", // Default value of properties
            displayType() {
                // Method which will display type of Animal
                console.log(this.type);
            },
        };
        
        // Create new animal type called animal1 using the Object prototype 'Animal'
        const animal1 = Object.create(Animal);

        expect(animal1.displayType()).toEqual("Invertebrates");    
    });

    it("should be able to enumerate through object's properties", function() {
        function showProps(obj, objName) {
            let result = "";
            Object.keys(obj).forEach((i) => {
              result += `${objName}.${i} = ${obj[i]}\n`;
            });
            return result;
        }     
        
        const myHonda = {
            color: "red",
            wheels: 4
        };

        expect(showProps(myHonda, 'Honda')).toEqual(`Honda.color = red\nHonda.wheels = 4\n`);
    });

    /*it("should be able to add and remove properties (not doable in typescript)", function() {
        // Creates a new object, myobj, with two properties, a and b.
        const myobj = new Object();
        myobj.a = 5;
        myobj.b = 12;

        // Removes the a property, leaving myobj with only the b property.
        delete myobj.a;
        console.log("a" in myobj); // false
    });*/

    it("should be able to define an object method and use 'this'", function() {
        const Intern = {
            name: "Tyrone",
            age: 21,
            job: "Software Engineer Intern",
            sayHi: () => {
                return `Hello, my name is ${this.name}`; // This will refer to the object in question that encapsulates the function
            }
        };

        expect(Intern.sayHi()).toEqual(`Hello, my name is Tyrone`);
    });

    it("should be able to define and call object getters and setters", function() {
        const myObj = {
            a: 7,
            get b() { // specialized method defined with get keyword
              return this.a + 1;
            },
            set c(x) { // specialized method defined with set keyword
              this.a = x / 2;
            },
        };

        myObj.c(24);
        expect(myObj.b()).toEqual(13);
        expect(myObj.b()).not.toEqual(8);
    });

    it("should be able to compare objects", function() {
        // In JavaScript, objects are a reference type
        // Two distinct objects are never equal, even if they have the same properties.
        // Only comparing the same object reference with itself yields true.

        // Two variables, two distinct objects with the same properties
        const fruit = { name: "apple" };
        const fruitbear = { name: "apple" };

        expect(fruit == fruitbear).toBe(false); 
        expect(fruit === fruitbear).toBe(false); 

        // Two variables, a single object
        const fruit2 = { name: "apple" };
        const fruitbear2 = fruit; // Assign fruit object reference to fruitbear

        expect(fruit2 == fruitbear2).toBe(true); 
        expect(fruit2 === fruitbear2).toBe(true); 
    });
});

describe("Testing Classes", () => {   

    // Declaring a class
    class MyClass {
        // Constructor
        constructor() {
          // Constructor body
        }
        // Instance field
        myField = "foo";
        // Instance method
        myMethod() {
          // myMethod body
        }
        // Static field
        static myStaticField = "bar";
        // Static method
        static myStaticMethod(str : string) {
          // myStaticMethod body
          this.myStaticField = str;
        }
        // Static block
        static {
          // Static initialization code
        }
        // Fields, methods, static fields, and static methods all have
        // "private" forms - using #
        #myPrivateField = "bar";

        getField() {
            return this.#myPrivateField;
          }
        setField(value) {
            this.#myPrivateField = value;
        }
    }
      
    it("should create classes using new operator", function() {        
        const myInstance = new MyClass();
        let spy = spyOn(myInstance, 'myMethod');
        
        expect(myInstance.myField).toEqual('foo');
        myInstance.myMethod();
        expect(spy).toHaveBeenCalled();
    });

    it("should be able to encapsulate fields by making them private", function() {        
        const myInstance = new MyClass();
        myInstance.setField('baz');
        
        expect(myInstance.getField()).toEqual('baz');

        //Note: A class method can read the private fields of other instances, as long as they belong to the same class.
        //Methods, getters, and setters can be private as well. (define them with # as well)
        //They're useful when you have something complex that the class needs to do internally 
        //but no other part of the code should be allowed to call.
    });

    /*
    Static properties are a group of class features that are defined on the class itself, rather than on individual instances of the class. These features include:

    Static methods
    Static fields
    Static getters and setters
    
    Static properties are very similar to their instance counterparts, except that:

    They are all prefixed with static, and
    They are not accessible from instances.
    */

    it("should be able to call static properties", function() {        
        const myInstance = new MyClass();
        
        //myInstance.myStaticField = 1; cannot access static property from obj instance
        
        MyClass.myStaticMethod("baz");
        expect(MyClass.myStaticField).toEqual('baz');
    });

    class derivedClass extends MyClass {
        #extendedField

        constructor() {
            super(); // calls parent class
            this.#extendedField = super.myField + " extended"; // call parent properties with super keyword
        }

        myMethod() {
            // Overrides the parent class's myMethod body
            return this.#extendedField;
        }
    }

    it("should be able to create and use inheriting class", function() {        
        const myInstance = new derivedClass();
        
        expect(myInstance.myMethod()).toEqual('foo extended');

        /* Derived classes don't have access to the parent class's private fields — 
        this is another key aspect to JavaScript private fields being "hard private". 
        Private fields are scoped to the class body itself and do not grant access to any outside code.
        */
       //let x = myInstance.#myPrivateField;

       //A class can only extend from one class. This prevents problems in multiple inheritance like the diamond problem

       //Instances of derived classes are also instances of the base class.
       expect(myInstance instanceof derivedClass).toEqual(true);
       expect(myInstance instanceof MyClass).toEqual(true);
    });
});
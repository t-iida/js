importClass(java.lang.System)
importClass(com.mongodb.Mongo, com.mongodb.BasicDBObject, com.mongodb.DBCursor)
importClass(com.mongodb.rhino.BSON, com.mongodb.rhino.JSON)

// Prepare collection of MongoDB.
var connection = new Mongo()
var db = connection.getDB('mydb');
var collection = db.getCollection('testCollection');

function createDoc(idx) {
    var doc = new BasicDBObject();
    doc.put("name", "Name-" + idx);
    doc.put("age",  7);
    doc.put("sayName", "function(){return 'My name is Name-' + " + idx + ";}");
    return doc;
}

// Insert JSON objects.
for(idx = 0; idx < 10; idx++) {
    collection.insert(createDoc(idx));    
}

var documents = collection.find();

while(documents.hasNext()) {
  var object = BSON.from(documents.next());
  for(elm in object) {
    System.out.print(" ");
    if(eval("object." + elm).toString().indexOf("function(") == 0) {
      System.out.print("says '" + eval(object.sayName)() + " !!'");
    } else {
      System.out.print(elm + " = " + eval("object." + elm));
    }
  }
  System.out.println("");
}

// -- End of script.

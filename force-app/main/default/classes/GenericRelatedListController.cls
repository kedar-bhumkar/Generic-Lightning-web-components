public with sharing class GenericRelatedListController {
    @AuraEnabled(cacheable=true)
    public static List<SObject> getRelatedList(String theData) {
        System.debug('*** param recv = ' + theData);        
        ListMetaData listData =  (ListMetaData)JSON.deserialize(theData, ListMetaData.class);
        System.debug('*** ListMetaData object = ' + listData);
        
        String query = 'Select ';
        //append fields
        for(ListMetaData.Afield f:listData.fields){
            query+= f.fieldName + ',';
        }
        query = query.removeEnd(','); 

        //append object
        query+= ' from ' + listData.obj;

        //filter condition
        query+= ' where ' + listData.parent.obj + '=' + '\'' + listData.parent.id + '\'';

        //limit clause
        query+= ' Limit ' + listData.thelimit; 

        System.debug('SOQL query = ' + query);

        return Database.query(query);
    }
  
}
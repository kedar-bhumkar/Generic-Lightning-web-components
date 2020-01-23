public with sharing class ListMetadata {
      public class ParentData{
        @AuraEnabled
        public String obj;
        @AuraEnabled
        public String id;
    } 

    public class Afield{
        @AuraEnabled
        public string label;
        @AuraEnabled
        public string fieldName;
    } 
   
        @AuraEnabled
        public String obj;
        @AuraEnabled
        public ParentData parent;
        @AuraEnabled
        public List<Afield> fields;
        @AuraEnabled
        public String theLimit;
   

}
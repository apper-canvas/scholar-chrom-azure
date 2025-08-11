import { toast } from 'react-toastify'

const gradeService = {
  async getAll() {
    try {
      // Initialize ApperClient with Project ID and Public Key
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { 
            field: { name: "student_id_c" },
            referenceField: { field: { Name: "Name" } }
          },
          { 
            field: { name: "class_id_c" },
            referenceField: { field: { Name: "Name" } }
          },
          { field: { Name: "assignment_name_c" } },
          { field: { Name: "score_c" } },
          { field: { Name: "max_score_c" } },
          { field: { Name: "date_c" } },
          { field: { Name: "category_c" } }
        ]
      }
      
      const response = await apperClient.fetchRecords('grade_c', params)
      
      if (!response || !response.data || response.data.length === 0) {
        return []
      }
      
      return response.data
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching grades:", error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      return []
    }
  },

  async getById(id) {
    try {
      // Initialize ApperClient with Project ID and Public Key
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { 
            field: { name: "student_id_c" },
            referenceField: { field: { Name: "Name" } }
          },
          { 
            field: { name: "class_id_c" },
            referenceField: { field: { Name: "Name" } }
          },
          { field: { Name: "assignment_name_c" } },
          { field: { Name: "score_c" } },
          { field: { Name: "max_score_c" } },
          { field: { Name: "date_c" } },
          { field: { Name: "category_c" } }
        ]
      }
      
      const response = await apperClient.getRecordById('grade_c', id, params)
      
      if (!response || !response.data) {
        return null
      }
      
      return response.data
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching grade with ID ${id}:`, error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      return null
    }
  },

  async create(gradeData) {
    try {
      // Initialize ApperClient with Project ID and Public Key
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      // Only include updateable fields
      const params = {
        records: [{
          Name: gradeData.assignment_name_c,
          student_id_c: parseInt(gradeData.student_id_c),
          class_id_c: parseInt(gradeData.class_id_c),
          assignment_name_c: gradeData.assignment_name_c,
          score_c: gradeData.score_c,
          max_score_c: gradeData.max_score_c,
          date_c: gradeData.date_c,
          category_c: gradeData.category_c
        }]
      }
      
      const response = await apperClient.createRecord('grade_c', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success)
        const failedRecords = response.results.filter(result => !result.success)
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create grade ${failedRecords.length} records:${JSON.stringify(failedRecords)}`)
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`)
            })
            if (record.message) toast.error(record.message)
          })
        }
        
        return successfulRecords.length > 0 ? successfulRecords[0].data : null
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating grade:", error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      return null
    }
  },

  async update(id, gradeData) {
    try {
      // Initialize ApperClient with Project ID and Public Key
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      // Only include updateable fields plus Id
      const params = {
        records: [{
          Id: id,
          Name: gradeData.assignment_name_c,
          student_id_c: parseInt(gradeData.student_id_c),
          class_id_c: parseInt(gradeData.class_id_c),
          assignment_name_c: gradeData.assignment_name_c,
          score_c: gradeData.score_c,
          max_score_c: gradeData.max_score_c,
          date_c: gradeData.date_c,
          category_c: gradeData.category_c
        }]
      }
      
      const response = await apperClient.updateRecord('grade_c', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success)
        const failedUpdates = response.results.filter(result => !result.success)
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update grade ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`)
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`)
            })
            if (record.message) toast.error(record.message)
          })
        }
        
        return successfulUpdates.length > 0 ? successfulUpdates[0].data : null
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating grade:", error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      return null
    }
  },

  async delete(id) {
    try {
      // Initialize ApperClient with Project ID and Public Key
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      const params = {
        RecordIds: [id]
      }
      
      const response = await apperClient.deleteRecord('grade_c', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return false
      }
      
      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success)
        const failedDeletions = response.results.filter(result => !result.success)
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete grade ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`)
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message)
          })
        }
        
        return successfulDeletions.length > 0
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting grade:", error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      return false
    }
  }
}

export default gradeService
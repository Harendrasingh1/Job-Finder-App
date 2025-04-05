# React Native Job Board App

This is a React Native application built using Expo, designed to display job listings and allow users to bookmark their favorite jobs for offline viewing.

## Functional Requirements

1. **Bottom Navigation**:
   - On opening the app, users are presented with a bottom navigation UI with "Jobs" and "Bookmarks" sections.

2. **Jobs Screen**:
   - Fetches job data from the API (`https://testapi.getlokalapp.com/common/jobs?page=1`) using infinite scroll.
   - Displays job title, location, salary, and phone data in each card.
   - Clicking on a Job card should navigate to another screen showing more details related to it.

3. **Bookmarking**:
   - Users can bookmark a Job, and this will appear in the "Bookmarks" tab.
   - All bookmarked Jobs are stored in a database for offline viewing.

4. **State Management**:
   - Maintain appropriate states for loading, error handling, and empty results throughout the app.



## 📷 Screenshots
### Job Available

 ![Jobs Screen](Demo%20Video%20and%20Images/Job%20Finder%20windor%20image%20(2).png)

### Bookmarks
 ![Bookmarks Screen](Demo%20Video%20and%20Images/Job%20Finder%20windor%20image%20(1).png) -->

## Setup

To run the app locally

```
# clone
git clone https://github.com/Harendrasingh1/Job-Finder-App/tree/master


# run command
npm install

# start Project
npm start
```

## 👤 Author
**Harendra Singh**  
📌 [GitHub](https://github.com/Harendrasingh1) | 📌 [LinkedIn](https://www.linkedin.com/in/harendra8587/) | 📌 [LeetCode](https://leetcode.com/u/Thakurji01/)

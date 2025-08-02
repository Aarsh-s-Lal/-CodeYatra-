document.addEventListener("DOMContentLoaded", function (){
    const searchButton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector
    (".stats-container");
    const easyProgressCircle = document.querySelector
    (".easy-progress") ;
     const mediumProgressCircle = document.querySelector(".medium-progress") ;
    const hardProgressCircle = document.querySelector(".hard-progress") ;

    const easyLabel = document.getElementById("easy-label") ;
    const mediumLabel = document.getElementById("medium-label") ;
    const hardLabel = document.getElementById("hard-label") ;

    const cardStatscontainer = document.querySelector(".stats-card") ;

    // Local storage functions
    function saveRecentSearch(username) {
        let recentSearches = JSON.parse(localStorage.getItem('leetcode-recent-searches') || '[]');
        
        // Remove if already exists to avoid duplicates
        recentSearches = recentSearches.filter(search => search !== username);
        
        // Add to beginning
        recentSearches.unshift(username);
        
        // Keep only last 5 searches
        recentSearches = recentSearches.slice(0, 5);
        
        localStorage.setItem('leetcode-recent-searches', JSON.stringify(recentSearches));
    }

    function getRecentSearches() {
        return JSON.parse(localStorage.getItem('leetcode-recent-searches') || '[]');
    }

    function clearUserData() {
        cardStatscontainer.innerHTML = '';
        easyLabel.textContent = '';
        mediumLabel.textContent = '';
        hardLabel.textContent = '';
        // Reset progress circles
        easyProgressCircle.style.setProperty("--progress-degree", "0%");
        mediumProgressCircle.style.setProperty("--progress-degree", "0%");
        hardProgressCircle.style.setProperty("--progress-degree", "0%");
    }

    // Toast notification function
    function showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        
        toastContainer.appendChild(toast);
        
        // Trigger animation
        setTimeout(() => toast.classList.add('show'), 100);
        
        // Remove toast after 4 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toastContainer.removeChild(toast), 300);
        }, 4000);
    }

    // Loading state management
    function setLoadingState(isLoading) {
        if (isLoading) {
            searchButton.textContent = "Searching...";
            searchButton.disabled = true;
            searchButton.classList.add('loading');
        } else {
            searchButton.textContent = "Search";
            searchButton.disabled = false;
            searchButton.classList.remove('loading');
        }
    }

    //return true  or  false based on regex
    function validateUsername(username) {
         if(username.trim()===""){
            showToast("Username should not be empty", "error");
            return false;
         }

         const regex = /^[a-zA-Z0-9_-]{1,15}$/ ; 
         const isMatching = regex.test(username);
         if(!isMatching){
            showToast("Invalid username format. Use only letters, numbers, underscores, and hyphens (1-15 characters)", "error");
         }
         return isMatching;
    }

    async function fetchUserDetails(username) {

        try
        {
           setLoadingState(true);
           showToast("Fetching user data...", "info");

           const proxyUrl = `https://cors-anywhere.herokuapp.com/`;  
           const targetUrl = `https://leetcode.com/graphql/` ;
           //concatenate proxy url and target url : https://cors-anywhere.herokuapp.com/https://leetcode.com/graphql/
           const  myHeaders = new Headers() ;
           myHeaders.append("Content-Type", "application/json") ;
        
           const graphql = JSON.stringify({
           query: "\n   query userSessionProgress($username: String!) {\n  allQuestionsCount {\n    difficulty\n    count\n  }\n  matchedUser(username: $username) {\n    submitStats {\n      acSubmissionNum {\n        difficulty\n        count\n        submissions\n      }\n      totalSubmissionNum {\n        difficulty\n        count\n        submissions\n      }\n    }\n  }\n}\n",
           variables: { "username" : `${username}`}
           })

            const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: graphql,
            redirect: "follow",
            };

           const response = await fetch(proxyUrl+targetUrl, requestOptions) ;

           if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
           }

           const parseddata = await response.json() ; 
           
           if (parseddata.errors) {
               throw new Error("User not found or API error occurred");
           }
           
           if (!parseddata.data.matchedUser) {
               throw new Error("User not found on LeetCode");
           }
           
           console.log("Logging data", parseddata);
           showToast("Data fetched successfully!", "success");
           
           // Save successful search to recent searches
           saveRecentSearch(username);

           displayUserData(parseddata) ;
        }
        catch(error){
              console.error("Error fetching user data:", error);
              showToast(`Error: ${error.message}`, "error");
              // Clear any existing data
              clearUserData();
        }
        finally{
              setLoadingState(false);
        }

    }

    function displayUserData(parseddata)
    {
        try {
            const totalQues = parseddata.data.allQuestionsCount[0].count ; 
            const totalEasyQues = parseddata.data.allQuestionsCount[1].count ; 
            const totalMediumQues = parseddata.data.allQuestionsCount[2].count ; 
            const totalHardQues = parseddata.data.allQuestionsCount[3].count ; 

            const solvedTotalQues = parseddata.data.matchedUser.submitStats.acSubmissionNum[0].count ; 
            const solvedEasyQues = parseddata.data.matchedUser.submitStats.acSubmissionNum[1].count ; 
            const solvedMediumQues = parseddata.data.matchedUser.submitStats.acSubmissionNum[2].count ; 
            const solvedHardQues = parseddata.data.matchedUser.submitStats.acSubmissionNum[3].count ; 

            updateProgress(solvedEasyQues,totalEasyQues,easyLabel,easyProgressCircle) ;
            updateProgress(solvedMediumQues,totalMediumQues,mediumLabel,mediumProgressCircle) ;
            updateProgress(solvedHardQues,totalHardQues,hardLabel,hardProgressCircle) ; 

            const cardData= [
                 {label: "Total Problems Solved", value: solvedTotalQues, icon: "🎯"},
                 {label: "Overall Submissions", value:parseddata.data.matchedUser.submitStats.totalSubmissionNum[0].submissions, icon: "📊"},
                 {label: "Easy Problems Solved", value: solvedEasyQues, icon: "🟢"},
                 {label: "Medium Problems Solved", value: solvedMediumQues, icon: "🟡"},
                 {label: "Hard Problems Solved", value: solvedHardQues, icon: "🔴"},
                 {label: "Acceptance Rate", value: `${((solvedTotalQues / parseddata.data.matchedUser.submitStats.totalSubmissionNum[0].submissions) * 100).toFixed(1)}%`, icon: "✅"}
            ] ; 

            console.log("Card data: " , cardData) ;

            cardStatscontainer.innerHTML = cardData.map
            (data => {
                return `
                <div class="card">
                   <div class="card-icon">${data.icon}</div>
                   <h4>${data.label}</h4>
                   <p class="card-value">${data.value}</p>
                </div>`;
            }).join("");
        } catch (error) {
            console.error("Error displaying user data:", error);
            showToast("Error displaying user data", "error");
        }
     }




    function updateProgress(solved,total,label,circle){
         const progressDegree = (solved/total)*100 ; 
         circle.style.setProperty("--progress-degree",`${progressDegree}%`) ; 

         label.textContent = `${solved}/${total}` ;
         
    }


    



    function handleSearch() {
        const username = usernameInput.value;
        
        console.log("Logging username: " + username); 

        if(validateUsername(username)){
            fetchUserDetails(username);
        }
    }

    searchButton.addEventListener('click', handleSearch);
    
    // Add Enter key support
    usernameInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            handleSearch();
        }
    });

    
})
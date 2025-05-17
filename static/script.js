function insertTemplate(template) {
    const textarea = document.getElementById('userQuery');
    
    switch(template) {
        case 'safety concerns in Nigeria':
            textarea.value = "What are the top safety concerns in Nigeria right now? Please provide specific risks and safety recommendations for visitors and residents.";
            break;
        case 'workplace safety assessment':
            textarea.value = "Please provide a workplace safety assessment for a manufacturing facility in Nigeria. Include potential hazards and recommended safety protocols.";
            break;
        case 'travel safety precautions':
            textarea.value = "I'm planning to travel to Lagos and Abuja in Nigeria next month. What safety precautions should I take and which areas should I avoid?";
            break;
    }
}

// Function to get response from the safety agent
function getResponse() {
    const query = document.getElementById('userQuery').value.trim();
    const submitBtn = document.getElementById('submitBtn');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const responseSection = document.getElementById('responseSection');
    const responseContent = document.getElementById('responseContent');
    const errorMessage = document.getElementById('errorMessage');
    
    // Validate input
    if (query.length < 10) {
        errorMessage.textContent = "Please provide more details about your safety concern.";
        errorMessage.style.display = "block";
        return;
    }
    
    // Hide error if previously shown
    errorMessage.style.display = "none";
    
    // Show loading state
    submitBtn.disabled = true;
    loadingIndicator.style.display = "block";
    // responseSection.classList.add("hidden");
    
    // Send the query to our Flask backend
    fetch('/get_safety_advice', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: query })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.error) {
            throw new Error(data.error);
        }
        
        // Display the response
        // responseContent.innerHTML = data.result;
        
        // If markdown formatting is needed, uncomment and use this instead:
        responseContent.innerHTML = convertMarkdownToHTML(data.result);
        
        responseSection.classList.remove("hidden");
        
        // Scroll to the response
        responseSection.scrollIntoView({ behavior: "smooth" });
    })
    .catch(error => {
        // Display error message
        errorMessage.textContent = "Error: " + error.message;
        errorMessage.style.display = "block";
    })
    .finally(() => {
        // Reset UI state
        loadingIndicator.style.display = "none";
        submitBtn.disabled = false;
    });
}

// Simple markdown to HTML converter
function convertMarkdownToHTML(markdown) {
    // Convert headers
    let html = markdown.replace(/^# (.*$)/gm, '<h1>$1</h1>');
    html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    
    // Convert bold text
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Convert lists
    html = html.replace(/^\d+\. (.*$)/gm, '<li>$1</li>');
    html = html.replace(/^- (.*$)/gm, '<li>$1</li>');
    
    // Wrap lists in <ul> or <ol>
    let inList = false;
    let listType = '';
    const lines = html.split('\n');
    html = '';
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        if (line.startsWith('<li>')) {
            // Determine list type based on original markdown line
            const originalLine = markdown.split('\n')[i];
            const isOrdered = /^\d+\./.test(originalLine);
            const currentListType = isOrdered ? 'ol' : 'ul';
            
            // Start a new list if needed
            if (!inList) {
                html += `<${currentListType}>`;
                listType = currentListType;
                inList = true;
            } 
            // Close previous list and start a new one if list type changes
            else if (listType !== currentListType) {
                html += `</${listType}>`;
                html += `<${currentListType}>`;
                listType = currentListType;
            }
            
            html += line;
        } else {
            // Close list if we're exiting a list
            if (inList) {
                html += `</${listType}>`;
                inList = false;
            }
            
            html += line + '\n';
        }
    }
    
    // Close list if document ends with a list
    if (inList) {
        html += `</${listType}>`;
    }
    
    // Convert paragraphs
    html = html.replace(/\n\n/g, '<br><br>');
    
    return html;
}
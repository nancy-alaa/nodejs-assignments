
https://leetcode.com/problems/customer-who-visited-but-did-not-make-any-transactions
# Write your MySQL query statement below
SELECT customer_id, COUNT(*) as count_no_trans FROM Visits 
WHERE Visits.visit_id NOT IN (
    SELECT visit_id FROM Transactions
) 
GROUP BY customer_id;

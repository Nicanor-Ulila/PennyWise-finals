       IDENTIFICATION DIVISION.
       PROGRAM-ID. TransactionReport.

       ENVIRONMENT DIVISION.
       INPUT-OUTPUT SECTION.
       FILE-CONTROL.
           SELECT TransactionFile ASSIGN TO "transaction_report.txt"
               ORGANIZATION IS LINE SEQUENTIAL
               ACCESS MODE IS SEQUENTIAL
               FILE STATUS IS WS-FILE-STATUS.

       DATA DIVISION.
       FILE SECTION.
       FD  TransactionFile.
       01  TransactionRecord.
           05  TransactionLine       PIC X(100).

       WORKING-STORAGE SECTION.
       01  TransactionTable.
           05  TransactionEntry OCCURS 10 TIMES INDEXED BY TX-IDX.
               10  Type                PIC X(20).
               10  Category            PIC X(20).
               10  Amount              PIC 9(10)V99.
               10  Currency            PIC X(3).
               10  Removed             PIC X(1).

       01  TX-COUNT              PIC 9(3) VALUE 0.  *> Total transactions count.
       01  WS-FILE-STATUS        PIC XX.
       01  CobolOutput           PIC X(200).
       01  RemovedStatus         PIC X(10).

       PROCEDURE DIVISION.
       BEGIN.
           OPEN INPUT TransactionFile
           IF WS-FILE-STATUS NOT = "00"
               DISPLAY "ERROR: Unable to open file."
               STOP RUN
           END-IF

           MOVE 0 TO TX-COUNT
           PERFORM ReadTransactions

           PERFORM ProcessTransactions

           CLOSE TransactionFile
           STOP RUN.

       ** Read records from the file and populate the TransactionTable.
       ReadTransactions.
           PERFORM UNTIL WS-FILE-STATUS = "10"  *> EOF
               READ TransactionFile INTO TransactionLine
                   AT END
                       EXIT PERFORM
               END-READ

               ADD 1 TO TX-COUNT
               IF TX-COUNT > 10
                   DISPLAY "ERROR: Too many transactions in file."
                   STOP RUN
               END-IF

               PERFORM ParseTransactionLine
           END-PERFORM.

       ** Parse each line and split into TransactionTable fields.
       ParseTransactionLine.
           UNSTRING TransactionLine DELIMITED BY ","
               INTO Type(TX-COUNT)
                    Category(TX-COUNT)
                    Amount(TX-COUNT)
                    Currency(TX-COUNT)
                    Removed(TX-COUNT).

       ** Process the transactions and display the results.
       ProcessTransactions.
           PERFORM VARYING TX-IDX FROM 1 BY 1 UNTIL TX-IDX > TX-COUNT
               PERFORM CheckRemovedStatus

               MOVE "Transaction "    TO CobolOutput
               STRING CobolOutput DELIMITED BY SIZE
                      TX-IDX DELIMITED BY SIZE
                      RemovedStatus DELIMITED BY SIZE
                      INTO CobolOutput
               DISPLAY CobolOutput

               MOVE "Type: "          TO CobolOutput
               STRING CobolOutput DELIMITED BY SIZE
                      Type(TX-IDX) DELIMITED BY SIZE
                      " Category: " DELIMITED BY SIZE
                      Category(TX-IDX) DELIMITED BY SIZE
                      " Amount: " DELIMITED BY SIZE
                      Amount(TX-IDX) DELIMITED BY SIZE
                      " " Currency(TX-IDX) DELIMITED BY SIZE
                      INTO CobolOutput
               DISPLAY CobolOutput

               MOVE CobolOutput TO TransactionLine
               WRITE TransactionRecord

               MOVE "====================" TO CobolOutput
               DISPLAY CobolOutput
           END-PERFORM.

       ** Check the removed status and set it.
       CheckRemovedStatus.
           IF Removed(TX-IDX) = "Y" 
               MOVE " (REMOVED)" TO RemovedStatus
           ELSE
               MOVE " " TO RemovedStatus
           END-IF.
           EXIT.

       END PROGRAM TransactionReport.

use BookStore
go

-- Account
CREATE TABLE Account (
    AccountID INT IDENTITY(1,1) PRIMARY KEY,
    Email NVARCHAR(100) UNIQUE NOT NULL,
    Password NVARCHAR(255) NOT NULL,
    CreatedDate DATETIME DEFAULT GETDATE()
);
GO

-- UserInfo
CREATE TABLE UserInfo (
    UserInfoID INT IDENTITY(1,1) PRIMARY KEY,
    AccountID INT NOT NULL,
    FirstName NVARCHAR(100),
    LastName NVARCHAR(100),
    PhoneNumber NVARCHAR(20),
    FOREIGN KEY (AccountID) REFERENCES Account(AccountID)
);
GO

ALTER TABLE UserInfo
ADD Email NVARCHAR(100) NULL,
    DateOfBirth DATE NULL,
    Gender NVARCHAR(10) NULL,
    RegistrationDate DATETIME DEFAULT GETDATE(), -- GETDATE() cho SQL Server
    LastLogin DATETIME NULL,
    Avatar NVARCHAR(255) NULL,
    City NVARCHAR(50) NULL,
    Country NVARCHAR(50) NULL
go

select * from UserInfo
go
select * from Account
go
-- TypeBook
CREATE TABLE TypeBook (
    TypeBookID INT IDENTITY(1,1) PRIMARY KEY,
    TypeBookName NVARCHAR(100)
);
GO

-- Publisher
CREATE TABLE Publisher (
    PublisherID INT IDENTITY(1,1) PRIMARY KEY,
    PublisherName NVARCHAR(100)
);
GO

-- Author
CREATE TABLE Author (
    AuthorID INT IDENTITY(1,1) PRIMARY KEY,
    AuthorName NVARCHAR(100)
);
GO

-- Book
CREATE TABLE Book (
    BookID INT IDENTITY(1,1) PRIMARY KEY,
    TypeBookID INT,
    PublisherID INT,
    AuthorID INT,
    Title NVARCHAR(255),
    Description NVARCHAR(MAX),
    Price DECIMAL(10, 2),
    Stock INT DEFAULT 0,
    FOREIGN KEY (TypeBookID) REFERENCES TypeBook(TypeBookID),
    FOREIGN KEY (PublisherID) REFERENCES Publisher(PublisherID),
    FOREIGN KEY (AuthorID) REFERENCES Author(AuthorID)
);
GO

-- Cart
CREATE TABLE Cart (
    CartID INT IDENTITY(1,1) PRIMARY KEY,
    AccountID INT NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (AccountID) REFERENCES Account(AccountID)
);
GO

-- CartItem
CREATE TABLE CartItem (
    CartItemID INT IDENTITY(1,1) PRIMARY KEY,
    CartID INT NOT NULL,
    BookID INT NOT NULL,
    Quantity INT NOT NULL,
    AddedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (CartID) REFERENCES Cart(CartID),
    FOREIGN KEY (BookID) REFERENCES Book(BookID)
);
GO

-- Order
CREATE TABLE [Order] (
    OrderID INT IDENTITY(1,1) PRIMARY KEY,
    AccountID INT NOT NULL,
    OrderDate DATETIME DEFAULT GETDATE(),
    Note NVARCHAR(MAX),
    FOREIGN KEY (AccountID) REFERENCES Account(AccountID)
);
GO

-- OrderItem
CREATE TABLE OrderItem (
    OrderItemID INT IDENTITY(1,1) PRIMARY KEY,
    OrderID INT NOT NULL,
    BookID INT NOT NULL,
    Quantity INT NOT NULL,
    PriceAtPurchase DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (OrderID) REFERENCES [Order](OrderID),
    FOREIGN KEY (BookID) REFERENCES Book(BookID)
);
GO

-- CHÈN DỮ LIỆU MẪU
INSERT INTO TypeBook (TypeBookName) VALUES
(N'Kỹ thuật phần mềm'),
(N'Trí tuệ nhân tạo'),
(N'Phân tích dữ liệu'),
(N'Lập trình'),
(N'Phát triển kỹ năng');
GO

INSERT INTO Publisher (PublisherName) VALUES
(N'NXB Trẻ'),
(N'NXB Giáo Dục'),
(N'NXB Lao Động'),
(N'NXB Văn Học'),
(N'NXB Khoa Học & Kỹ Thuật');
GO

INSERT INTO Author (AuthorName) VALUES
(N'Nguyễn Văn A'),
(N'Trần Thị B'),
(N'Lê Văn C'),
(N'Phạm Thị D'),
(N'Hồ Quốc E');
GO

INSERT INTO Book (TypeBookID, PublisherID, AuthorID, Title, Description, Price, Stock)
VALUES
(1, 1, 1, N'Nhập Môn Lập Trình', N'Sách cơ bản về lập trình cho người mới bắt đầu.', 120000, 50),
(2, 2, 2, N'Phân Tích Dữ Liệu Với Python', N'Hướng dẫn phân tích dữ liệu chi tiết.', 150000, 40),
(3, 3, 3, N'Trí Tuệ Nhân Tạo Cơ Bản', N'Cơ bản về AI và ứng dụng thực tế.', 180000, 30),
(4, 4, 4, N'Cấu Trúc Dữ Liệu Và Giải Thuật', N'Giải thích chi tiết cấu trúc dữ liệu.', 135000, 25),
(5, 5, 5, N'Kỹ Năng Giao Tiếp Hiệu Quả', N'Sách phát triển kỹ năng mềm.', 90000, 60),
(1, 2, 3, N'Thiết Kế Giao Diện Web', N'HTML, CSS và UX cơ bản.', 110000, 35),
(2, 3, 4, N'Machine Learning Cơ Bản', N'Giới thiệu về ML và các mô hình.', 170000, 20),
(3, 4, 5, N'Học Máy Với Scikit-learn', N'Thực hành học máy bằng Python.', 165000, 18),
(4, 5, 1, N'Quản Lý Dự Án Phần Mềm', N'Phương pháp quản lý agile và scrum.', 140000, 45),
(5, 1, 2, N'Tư Duy Phản Biện', N'Kỹ năng phân tích và suy luận logic.', 95000, 55),
(1, 3, 1, N'Java Cơ Bản Đến Nâng Cao', N'Tự học Java chi tiết.', 160000, 22),
(2, 4, 2, N'Phát Triển Web Với ReactJS', N'Hướng dẫn React từ cơ bản.', 175000, 28),
(3, 5, 3, N'AI Với TensorFlow', N'Thực hành AI và Deep Learning.', 190000, 15),
(4, 1, 4, N'Nhập Môn Cơ Sở Dữ Liệu', N'Lý thuyết và thực hành SQL.', 130000, 48),
(5, 2, 5, N'Sáng Tạo Trong Công Việc', N'Tư duy sáng tạo trong môi trường làm việc.', 105000, 33),
(1, 3, 2, N'Lập Trình Python Từ A Đến Z', N'Hướng dẫn học Python toàn diện.', 150000, 40),
(2, 4, 3, N'JavaScript Thực Chiến', N'Làm việc với JS trong dự án thực tế.', 145000, 30),
(3, 5, 4, N'Khoa Học Dữ Liệu Ứng Dụng', N'Sử dụng dữ liệu để giải quyết vấn đề.', 185000, 12),
(4, 1, 5, N'Mạng Máy Tính', N'Cấu trúc và hoạt động mạng.', 125000, 26),
(5, 2, 1, N'Quản Lý Thời Gian', N'Mẹo tối ưu thời gian làm việc.', 89000, 50),
(1, 4, 5, N'Android Development', N'Xây dựng ứng dụng Android.', 155000, 17),
(2, 5, 1, N'Phân Tích Kinh Doanh', N'Triển khai chiến lược qua dữ liệu.', 142000, 21),
(3, 1, 2, N'Tự Học C++', N'C++ từ cơ bản đến OOP.', 138000, 36),
(4, 2, 3, N'Lập Trình Web Toàn Tập', N'Từ frontend đến backend.', 160000, 27),
(5, 3, 4, N'Kỹ Năng Làm Việc Nhóm', N'Tăng hiệu quả làm việc nhóm.', 98000, 43);
GO

SELECT
    b.BookID,
    b.Title,
    b.Description,
    b.Price,
    b.Stock,
    tb.TypeBookName AS book_type,
    p.PublisherName,
    a.AuthorName
FROM Book b
JOIN TypeBook tb ON b.TypeBookID = tb.TypeBookID
JOIN Publisher p ON b.PublisherID = p.PublisherID
JOIN Author a ON b.AuthorID = a.AuthorID;
GO

--Search fulltext config
SELECT name
FROM sys.fulltext_catalogs;
GO

CREATE FULLTEXT CATALOG BookCatalog;
go
--tạo chỉ mục cho bookId
CREATE UNIQUE INDEX UX_Book_BookID ON Book(BookID);
go

CREATE FULLTEXT INDEX ON Book
(
    Title LANGUAGE 1066,            -- Vietnamese
    Description LANGUAGE 1066
)
KEY INDEX UX_Book_BookID
ON BookCatalog;
go

SELECT *
FROM Book
WHERE CONTAINS((Title, Description), N'"khoa học"');
go

-- Chọn database BookStore
USE BookStore;
GO

-- Xóa dữ liệu từ từng bảng (thứ tự có thể quan trọng do ràng buộc khóa ngoại)
DELETE FROM dbo.UserInfo;
DELETE FROM dbo.OrderItem;
DELETE FROM dbo.[Order];
DELETE FROM dbo.CartItem;
DELETE FROM dbo.Cart;
DELETE FROM dbo.Book;
DELETE FROM dbo.Author;
DELETE FROM dbo.Publisher;
DELETE FROM dbo.TypeBook;
DELETE FROM dbo.Account;
GO
-- Chọn database BookStore
USE BookStore;
GO
--RESET ID tự tăng sau khi thực hiện xóa dữ liệu và chèn trong bảng
-- Lặp qua tất cả các bảng người dùng
DECLARE @TableName NVARCHAR(255);
DECLARE TableCursor CURSOR FOR
SELECT TABLE_NAME
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_CATALOG = 'BookStore';

OPEN TableCursor;
FETCH NEXT FROM TableCursor INTO @TableName;

WHILE @@FETCH_STATUS = 0
BEGIN
    -- Kiểm tra xem bảng có cột identity hay không
    IF EXISTS (SELECT 1
               FROM sys.identity_columns
               WHERE OBJECT_ID(OBJECT_SCHEMA_NAME(object_id) + '.' + OBJECT_NAME(object_id)) = OBJECT_ID(@TableName))
    BEGIN
        -- In ra lệnh DBCC CHECKIDENT sẽ được thực hiện (để kiểm tra trước)
        PRINT 'DBCC CHECKIDENT (''' + @TableName + ''', RESEED, 0);';

        -- Thực hiện lệnh reset identity (BỎ COMMENT DÒNG NÀY KHI BẠN CHẮC CHẮN)
        EXEC('DBCC CHECKIDENT (''' + @TableName + ''', RESEED, 0);');
    END
    ELSE
    BEGIN
        PRINT '''' + @TableName + ''' không có cột identity.';
    END

    FETCH NEXT FROM TableCursor INTO @TableName;
END;

CLOSE TableCursor;
DEALLOCATE TableCursor;
GO

select * from account
go
select * from UserInfo
go

select * from Cart
go
select * from CartItem
go
select * from Book
go

SELECT
    c.CartId,
    c.AccountId,
    c.CreatedAt,
    ci.CartItemId,
    ci.BookId,
    b.Title AS BookTitle,
    ci.Quantity,
    ci.AddedAt,
    b.Price AS BookPrice
FROM
    Cart c
JOIN
    CartItem ci ON c.CartId = ci.CartId
JOIN
    Book b ON ci.BookId = b.BookId;
go

select BookID, Stock from Book
go

select * from [Order];
go
select * from [OrderItem];
go
select * from Book;
go
select * from TypeBook
go